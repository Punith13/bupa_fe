"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const data_json_1 = __importDefault(require("./data.json"));
const app = (0, express_1.default)();
const port = 3001;
const typeDefs = (0, apollo_server_express_1.gql) `
  type Book {
    name: String
    type: String
  }

  type Person {
    name: String
    gender: String
    books: [Book]
  }

  type Query {
    people(hardcoverOnly: Boolean): [Person]
  }
`;
const resolvers = {
    Query: {
        people: (_, { hardcoverOnly }) => {
            if (hardcoverOnly) {
                return data_json_1.default.filter((person) => person.books &&
                    person.books.some((book) => book.type === "Hardcover"));
            }
            return data_json_1.default;
        },
    },
};
const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/graphql" });
app.listen(port, () => {
    console.log(`Apollo Server is running on http://localhost:${port}/graphql`);
});
