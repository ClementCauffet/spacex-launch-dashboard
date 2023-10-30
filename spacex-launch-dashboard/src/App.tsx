import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import LaunchList from "./components/LaunchList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>SpaceX Launch Dashboard</h1>
        <LaunchList />
      </div>
    </ApolloProvider>
  );
}

export default App;
