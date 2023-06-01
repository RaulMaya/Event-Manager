import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import Signup from './pages/SignUp';
import Login from './pages/Login';
import Event from "./pages/Event"
import Events from "./pages/Events"
import CreateEvent from "./pages/CreateEvent"
import UserDashboard from "./pages/UserDashboard"

import { ChakraProvider } from '@chakra-ui/react';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_SERVER_URL,
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});


const App = () => {
    return (
        <ApolloProvider client={client}>
            <ChakraProvider>
                <Router>
                    <div className="flex-column justify-flex-start min-100-vh">
                        <NavBar />
                        <div className="container">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/createEvent" element={<CreateEvent />} />
                                <Route path="/userProfile" element={<UserDashboard />} />
                                <Route path="/events" element={<Events />} />
                                <Route path="/event/:id" element={<Event />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </div>
                    </div>
                </Router>
            </ChakraProvider>
        </ApolloProvider>
    );
};

export default App;
