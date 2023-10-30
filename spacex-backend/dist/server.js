"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./graphql/schema"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const app = (0, express_1.default)();
const server = new apollo_server_express_1.ApolloServer({ typeDefs: schema_1.default, resolvers: resolvers_1.default });
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 4000;
    app.listen({ port: PORT }, () => {
        console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
    });
}
startServer();