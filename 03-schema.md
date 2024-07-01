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


## Apollo Server with Express


## Custom Object Types


## Arrays and Non-Nullability


## Database Access


## Field Resolvers


## Resolver Chain


## Documentation Comments


## Object Associations































