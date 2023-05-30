import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_EVENTS } from '../utils/queries';
import EventList from '../components/EventList';
import { Box, Heading, Flex, Spinner, Alert } from '@chakra-ui/react';
import { FiTrendingUp } from 'react-icons/fi';

const Home = () => {
    const { loading, error, data } = useQuery(QUERY_ALL_EVENTS);
    const events = data?.events || [];

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert status="error">{error.message} :(</Alert>;
    }

    return (
        <Box maxW="container.lg" mx="auto" p={4}>
            <Box display="flex" alignItems="center" justifyContent="flex-start" mb={4}>
                <Heading as="h1" size="xl">
                    Trending Events
                </Heading>
                <FiTrendingUp size={24} ml={10} />
            </Box>
            <Box mb={4}>
                <EventList events={events} title="All our events..." />
            </Box>
        </Box>
    );
};

export default Home;
