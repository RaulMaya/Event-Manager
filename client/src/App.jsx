import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

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
import AuthService from './utils/auth';

import { ChakraProvider } from '@chakra-ui/react';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    //uri: "http://localhost:3001/graphql",
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

// Error handling link
const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message }) => {
            if (message === 'Invalid token') {
                // remove token and redirect to login page
                localStorage.removeItem('id_token');
                window.location.href = '/login';
            }
        });
    }
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` and `errorLink` middleware prior to making the request to our GraphQL API
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
});


const App = () => {
    const isAuthenticated = AuthService.loggedIn();
    return (
        <ApolloProvider client={client}>
            <ChakraProvider>
                <Router>
                    <div className="flex-column justify-flex-start min-100-vh">
                        <NavBar />
                        <div className="container">
                            <Routes>
                                <Route path="/" element={<Home isLoggedIn={isAuthenticated} />} />
                                <Route path="/login" element={<Login isAuthenticated={isAuthenticated} />} />
                                <Route path="/signup" element={<Signup isAuthenticated={isAuthenticated} />} />
                                <Route path="/createEvent" element={<CreateEvent />} />
                                <Route path="/userProfile" element={<UserDashboard />} />
                                <Route path="/events" element={<Events isAuthenticated={isAuthenticated} />} />
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
