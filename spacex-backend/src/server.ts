import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers"; 

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  //Defining server URL in Dockerfile or default localhost
  const hostname = process.env.HOSTNAME || 'localhost';

  //Running server
  app.listen({ port: PORT }, () => {
    console.log(`Server is running at http://${hostname}:${PORT}${server.graphqlPath}`);
  });
}

startServer();
