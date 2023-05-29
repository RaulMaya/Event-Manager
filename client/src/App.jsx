import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <NavBar />
        <Header />
        <Home />
        <Footer />
      </div>
    </ApolloProvider>
  );
};

export default App;
