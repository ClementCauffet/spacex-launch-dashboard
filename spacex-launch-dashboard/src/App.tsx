// App.tsx

import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importez les composants de React Router
import LaunchList from "./components/LaunchList";
import LaunchDetails from "./components/LaunchDetails";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  console.log("App Component Rendered");
  return (
    <ApolloProvider client={client}>
      <Router> 
        <div className="App">
          <h1>SpaceX Launch Dashboard</h1>          
          <Routes>
            <Route path="/" element={<LaunchList />} />
            <Route path="launch-details" element={<LaunchDetails />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
