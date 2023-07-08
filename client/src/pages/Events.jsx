import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_EVENTS } from '../utils/queries';
import EventList from '../components/EventList';
import { Box, Heading, Spinner, Alert, Button } from '@chakra-ui/react';
import AuthService from '../utils/auth';

const Events = () => {
    const { loading, error, data, refetch } = useQuery(QUERY_ALL_EVENTS);
    const events = data?.events || [];

    const isAuthenticated = AuthService.loggedIn();

    const handleRefetch = async () => {
        try {
            await refetch();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner color="purple.500" />
            </Box>
        );
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
                <Button onClick={handleRefetch}>Refresh Events</Button>
            </Box>
            <Box mb={4}>
                <EventList events={events} title="All our events..." isAuthenticated={isAuthenticated} showAllEvents={true} />
            </Box>
        </Box>
    );
};

export default Events;
