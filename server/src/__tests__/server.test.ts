import { createApolloServer } from "../server";
import request from "supertest";

describe("Testing get people books query", () => {
  let server, url;

  // before the tests we spin up a new Apollo Server
  beforeAll(async () => {
    // Note we must wrap our object destructuring in parentheses because we already declared these variables
    // We pass in the port as 0 to let the server pick its own ephemeral port for testing
    ({ server, url } = await createApolloServer({ port: 0 }));
  });

  // after the tests we'll stop the server
  afterAll(async () => {
    await server?.stop();
  });

  it("should check the query", async () => {
    const queryData = {
      query: `query getPersonBooks($hardcoverOnly: Boolean) {
        people(hardcoverOnly: $hardcoverOnly) {
          books {
            name
            type
          }
          gender
          name
        }
      }`,
      variables: { hardcoverOnly: false },
    };

    // send our request to the url of the test server
    const response = await request(url).post("/").send(queryData);
    expect(response.errors).toBeUndefined();

    expect(response.body.data?.people).toHaveLength(2);
  });

  it("should check for no Paperback books when hardcover only is true", async () => {
    const queryData = {
      query: `query getPersonBooks($hardcoverOnly: Boolean) {
        people(hardcoverOnly: $hardcoverOnly) {
          books {
            name
            type
          }
          gender
          name
        }
      }`,
      variables: { hardcoverOnly: true },
    };

    const response = await request(url).post("/").send(queryData);

    const peopleData = response.body.data?.people;

    // check for Paperback books
    const peopleDataPaperbackBooks = peopleData.reduce((acc, curr) => {
      curr.books.forEach((book) => {
        if (book.type === "Paperback") {
          acc = [...acc, book.name];
        }
      });

      return acc;
    }, []);

    expect(peopleDataPaperbackBooks).toHaveLength(0);
  });
});
