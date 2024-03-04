import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// define its schema 
// typeDefs is short for type definitions
// Inside it, uss the "Schema Definition Language"
// It is similar to a class definition in JS
// except it is called a "type", not a "class"
// This "type" will contains "fields",
// which can then be queried/requested by its clients.
// field definition syntax: field_name: field_data_type
// "String" is a GraphQL built-in type
const typeDefs = `
  # this is a comment
  type Query {
    greeting: String
  }
`;

// const typeDefs = `
//   # this is a comment

//   schema { # this is optional, because it is default. 
//     query: Query
//   }

//   type Query {
//     greeting: String
//   }
// `;

// the code that actually returns a "greeting" value
// This object must follow the same structure as the schema
// the value of "greeting" is a function,
// that returns an actual value
// this function is called the "resolver function",
// because it resolves the value of the field
// this function could return a rand string, 
// could load a value from a database, 
// could fetch it from some other API, etc. 
const resolvers = {
  Query: {
    greeting: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
// The above uses the short hand,
// the original form is: 
// const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers })

// hovering over this function, 
// the editor shows that this function returns a "promise",
// which means it is asynchronous. 
// To wait for the async operation to complete, 
// need to use the "await" keyword
const { url } = await startStandaloneServer(server, { listen: { port: 9000 } });
// this url is from object destructuring
console.log(`Server running at ${url}`);













