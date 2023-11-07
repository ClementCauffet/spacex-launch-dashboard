

import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import LaunchList from "./components/LaunchList";
import LaunchDetails from "./components/LaunchDetails";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});



function App() {
  console.log("App Component Rendered");
  return (
    <ApolloProvider client={client}>
      <Router> 
        <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <header>
            <p>SpaceX Launch Dashboard</p>  
          </header>
          <main>                
            <Routes>
              <Route path="/" element={<LaunchList />} />
              <Route path="launch-details" element={<LaunchDetails />} />
            </Routes>
          </main>
          <footer>
            <div>
              <div>
                <a href="https://github.com/ClementCauffet/spacex-launch-dashboard" target="_blank" rel="noopener noreferrer">
                  <img src="./img/github-mark.svg" alt="Project GitHub" />
                </a>
                <a href="https://github.com/r-spacex/SpaceX-API/tree/master/docs#rspacex-api-docs" target="_blank" rel="noopener noreferrer">
                  <img src="./img/github-mark.svg" alt="SpaceX API" />
                </a>
                <a href="https://twitter.com/ClementCauffet" target="_blank" rel="noopener noreferrer">
                  <img src="./img/twitter-mark.svg" alt="Twitter" />
                </a>
              </div>              
            </div>
          </footer>       
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
