# 3. Schema
## Job Board Architecture
Implementation of a typical job board:
- Will have a website that shows a list of jobs, 
- Users can click on an individual job title, then see the full job description. 
- There will also be sorting and pagination. 
- It also includes authentication, so users can login. 
- Users can post a new job, by filling in a form. 

Architecture: 
- The web pages will call the server using GraphQL
- Need a database to store job data, and server can talk with the db. We use SQLite for this, because it runs easily locally. 
- Data Access Layer. Can use the native db driver (aka, sqlite3) directly, but then need to write sql code directly in the js code. Knex (a query builder library) provides a nicer way to write sql queries in js. Or, we can use an Object/Relational mapper, like Prisma or Sequelize, which takes care of mapping the db tables to objects in js, and automatically generate db queries for common data access operations. To keep things simpler, we use Knex, the query builder. 
- Client will have a Web Framework, such as React, Vue, Angular, Svelte, Next.js, Remix, Nuxt, etc, which all work with GraphQL. We choose React for this one. 
- Use Apollo Server to implement the GraphQL API. 
- General purpose backend framework. Need to no just expose a GraphQL API, but also need a separate endpoint for authentication. Use Express for this. 
- Authentication. Use JSON Web Tokens. 

## Job Board Project
```shell
# navigate to the "job-board/server" folder
npm install
npm start

# navigate to the "job-board/client" folder
npm install
npm start

```

The front end is just some hard-coded fake data. Our task will be to make it to fetch data from the GraphQL API. 

## Apollo Server with Express
```shell
npm install @apollo/server graphql

```

"server/server.js":
```js
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js';
import { createCompanyLoader } from './db/companies.js';
import { getUser } from './db/users.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);

const typeDefs = await readFile('./schema.graphql', 'utf8');

async function getContext({ req }) {
  const companyLoader = createCompanyLoader();
  const context = { companyLoader };
  if (req.auth) {
    context.user = await getUser(req.auth.sub);
  }
  return context;
}

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

// Integrate Apollo Server into an Express application
// Express will send all requests for the graphql path to the apolloMiddleware,
// so they will be handled by the Apollo GraphQL engine. 
app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
```

"server/schema.graphql":
```graphql
type Query {
  company(id: ID!): Company
  job(id: ID!): Job
  jobs(limit: Int, offset: Int): JobSubList
}

type Mutation {
  createJob(input: CreateJobInput!): Job
  deleteJob(id: ID!): Job
  updateJob(input: UpdateJobInput!): Job
}

type Company {
  id: ID!
  name: String!
  description: String
  jobs: [Job!]!
}

type Job {
  id: ID!
  """The __date__ when the job was published, in ISO-8601 format. E.g. `2022-12-31`."""
  date: String!
  title: String!
  company: Company!
  description: String
}

type JobSubList {
  items: [Job!]!
  totalCount: Int!
}

input CreateJobInput {
  title: String!
  description: String
}

input UpdateJobInput {
  id: ID!
  title: String!
  description: String
}
```

"server/resolvers.js":
```js
import { GraphQLError } from 'graphql';
import { getCompany } from './db/companies.js';
import { countJobs, createJob, deleteJob, getJob, getJobs, getJobsByCompany, updateJob } from './db/jobs.js';

export const resolvers = {
  Query: {
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError('No Company found with id ' + id);
      }
      return company;
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError('No Job found with id ' + id);
      }
      return job;
    },
    jobs: async (_root, { limit, offset }) => {
      const items = await getJobs(limit, offset);
      const totalCount = await countJobs();
      return { items, totalCount };
    },
  },

  Mutation: {
    createJob: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      return createJob({ companyId: user.companyId, title, description });
    },

    deleteJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const job = await deleteJob(id, user.companyId);
      if (!job) {
        throw notFoundError('No Job found with id ' + id);
      }
      return job;
    },

    updateJob: async (_root, { input: { id, title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const job = await updateJob({ id, companyId: user.companyId, title, description });
      if (!job) {
        throw notFoundError('No Job found with id ' + id);
      }
      return job;
    },
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    company: (job, _args, { companyLoader }) => {
      return companyLoader.load(job.companyId);
    },
    date: (job) => toIsoDate(job.createdAt),
  },
};

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
}

function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZED' },
  });
}

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length);
}
```

## Custom Object Types


## Arrays and Non-Nullability


## Database Access


## Field Resolvers


## Resolver Chain


## Documentation Comments


## Object Associations































