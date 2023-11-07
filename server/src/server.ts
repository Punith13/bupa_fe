import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import type { ListenOptions } from "net";

import data from "./data.json" assert { type: "json" };

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

// Schema definition
export const typeDefs = `
  #graphql
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

// Resolver map
export const resolvers = {
  Query: {
    people: (_, { hardcoverOnly }: { hardcoverOnly: boolean }) => {
      if (hardcoverOnly) {
        const response = data.reduce((acc: Person[], curr: Person) => {
          const filteredBooks = curr.books?.filter(
            (book) => book.type === "Hardcover",
          );

          if (filteredBooks && filteredBooks.length) {
            return [...acc, { ...curr, books: filteredBooks }];
          }

          return acc;
        }, []);

        return response;
      }
      return data.filter((person) => person.books);
    },
  },
};

// This function will create a new server Apollo Server instance
export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 },
) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: listenOptions,
  });

  // return the server instance and the url the server is listening on
  return { server, url };
};

// For simplicity we create our server in this file,
// but in a real app you'd export `createApolloServer` into
// another file and call it elsewhere.
if (process.env.NODE_ENV !== "test") {
  const { url } = await createApolloServer();
  console.log(`🚀 Query endpoint ready at ${url}`);
}
