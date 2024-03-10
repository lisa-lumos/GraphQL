# 2. Fundamentals
## Schema definition
Will build a GraphQL server, and write a webpage that calls that API, and displays the data. 

Create a project folder, inside, create a "server" folder, with a file "server.js" inside:
```js
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
```

## Apollo Server
To expose this API over http, we need the Apollo Server library. 

Create a new file "package.json", set it to private, because we only want to use this project locally, not publishing it to a registry. By specifying `type` as `module`, rather than `commonjs`, it enables ES modules, so we can use modern js feature in the code, like the "import" keyword, and the "top-level await", etc. 
```json
{
  "name": "hello-world-server",
  "private": true,
  "type": "module"
}
```

Open the terminal, navigate to the project folder "server", and run
```console
npm install @apollo/server graphql
```

These packages will be added to the dependencies. 

Update the "server.js" code to use the packages:
```js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  # this is a comment
  type Query {
    greeting: String
  }
`;

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
```

Run the file "server.js":
```console
> node server.js
Server running at http://localhost:9000/

```

## Query Language
Go to browser and go to the url `http://localhost:9000/`, will see the Apollo Sandbox. 

This tool is a web-based client, that can be used to make GraphQL queries. It is enabled by default when Apollo Server was run in development. 

On the Documentation page, the schema of the API is displayed, in this case it is `greeting: String`. 

Create a query body. Press Control + Space, will display a set of suggestions. 
```
query {
  greeting
}
```
Next, press the Run button, and will get the JSON response:
```json
{
  "data": {
    "greeting": "Hello world!"
  }
}
```

The reason that the "greeting" is nested under "data", is because the response can contain other things, such as when you input the wrong field name in the request, the response will have "errors" filed, at the same level with "data". 

Note that in the request, the "query" is optional, so the request body becomes:
```
{
  greeting
}
```

In summary, this the QL (query language) in GraphQL. 

## GraphQL Over HTTP
How does the client (Apollo Sandbox) communicate with the server? 

Since we are using GraphQL over HTTP, we can open the Chrome Developer Tools and inspect the HTTP requests. 

Under the Network pane, can see it makes a new request every second. This is because by default, the Sandbox has "Schema polling" enabled, so it keeps requesting the schema from the server, to make sure it uses the latest version. It is good for development, but not helpful when we need to inspect the requests. So turn it off, by clicking the green dot. 

In the Network pane, clear the log using the 2nd button to from left. 

Select the "Fetch/XHR", so that it will only show server calls made from JavaScript, not from other requests like CSS files or images, etc. Also, in the filter box below the "clear" button, enter "localhost". So it will only show requests sent to the local GraphQL server. 

Now, click the "Run" button in the webpage, to post a request. In the developer console, we can then see the HTTP request made, to sent the GraphQL query. Double click it to expand it, and see the Headers tab:
```
Request URL:     http://localhost:9000/
Request Method:  POST
Status Code:     200 OK
Remote Address:  [::1]:9000
```

We can see that the method is "POST". By default, all GraphQL requests are sent as HTTP POST. This is different from a REST API, where to get some data, you typically use the GET method. 

If we look at the "Request Headers":
```
Content-Type: application/json
```

Now, click on the "Payload" tab, see
```
{"query":"query {\n  greeting\n}\n","variables":{}}
```

This shows that the client sent a JSON object, containing our query string. 

Under the "Headers" pane, under the "Response Headers" section, can see the response is also a JSON:
```
Content-Type: application/json; charset=utf-8
```

And under the "Response" tab:
```
{"data":{"greeting":"Hello world!"}}
```

Inspecting the Network requests in the DevTools can be very useful. If you have an issue, like some data is not showing up in the page, you can check if the HTTP request was successful from here. 

## GraphQL Client

## Github Repository

## Code-First vs Schema-First































