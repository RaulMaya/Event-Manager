import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_EVENTS } from '../utils/queries';
import EventList from '../components/EventList';
import { Box, Heading, Spinner, Alert } from '@chakra-ui/react';
import AuthService from '../utils/auth';

const Events = () => {
    const { loading, error, data } = useQuery(QUERY_ALL_EVENTS);
    const events = data?.events || [];

    const isAuthenticated = AuthService.loggedIn();

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert status="error">{error.message} :(</Alert>;
    }

    return (
        <Box maxW="container-fluid" mx="auto" p={4}>
            <Box display="flex" alignItems="center" justifyContent="flex-start" mb={4} mt={5}>
                <Heading as="h1" size="xl" marginRight={4} color="purple.500">
                    All Events
                </Heading>
            </Box>
            <Box mb={4}>
                <EventList events={events} title="All our events..." isAuthenticated={isAuthenticated} showAllEvents={true} />
            </Box>
        </Box>
    );
};

export default Events;