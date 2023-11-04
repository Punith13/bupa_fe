import express, { Application } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { DocumentNode } from "graphql";
import data from "./data.json";

const app: Application = express();
const port: number = 3001;

interface Book {
  name: string;
  type: string;
}

interface Person {
  name: string;
  gender: string;
  age: number;
  books: Book[] | null;
}

const typeDefs: DocumentNode = gql`
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

const resolvers: any = {
  Query: {
    people: (_: any, { hardcoverOnly }: { hardcoverOnly: boolean }) => {
      if (hardcoverOnly) {
        const response = data.reduce((acc: Person[], curr: Person) => {
          const filteredBooks = curr.books?.filter(
            (book) => book.type === "Hardcover"
          );

          if (filteredBooks && filteredBooks.length) {
            return [...acc, { ...curr, books: filteredBooks }];
          } else {
            return [];
          }
        }, []);

        return response;
      }
      return data.filter((person) => person.books);
    },
  },
};

async function startApolloServer() {
  const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  //@ts-ignore
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(port, () => {
    console.log(`Apollo Server is running on http://localhost:${port}/graphql`);
  });
}

startApolloServer();
