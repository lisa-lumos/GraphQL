# 1. Introduction
## What is GraphQL
It is a query language for your API. 

Like SQL is to query databases, GraphQL is to query web APIs. 

Compared with REST APIs, with GraphQL, you can ask what you need. So that the client has full control over which fields to fetch from the server. But with RESTful API, when you request a resource, you always get all the data in the response, which can result in "over-fetching" (fetching too much data, that is not actually used by the client). 

Also, with REST, if you want to fetch two different resources, you need to make to separate calls to the server. GraphQL let you get many resources in a single request (to avoid "under-fetching"). 

You can write a schema that fully describes your API - the schema-first approach. So you have a clear contract between the server and the clients. 

There are many useful tools for working with GraphQL, including web interfaces for running queries in the browser. 

It is possible to modify your API over time, without breaking backwards compatibility. 

You can easily add GraphQL to your existing applications, there is no need to rewrite your entire code base. GraphQL provides the API layer, but your data and business logic can stay the same. 

This tutorial uses JS for both the server and the client. But you could have a server written in Python, called by a client written in Java, etc. 

GraphQL started as an internal project in 2012, then was released as open source in 2015. The main reason why Facebook started developing a new way to build APIs, is that they wanted to speed up their mobile apps, that were too slow, because they were making too many calls to the server. 

## Required Tools
- recent LTS version of Node.js
- ESLint in VS Code
