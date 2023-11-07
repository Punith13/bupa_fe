import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.css";

import Main from "./components/Main";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPQHL_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

export default App;
