import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import {
    Box,
    Flex,
    Heading,
    Text,
    Divider,
    VStack,
    HStack,
    Link,
    Avatar,
    Image,
    SimpleGrid,
    Button
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const UserDashboard = () => {
    const { id } = useParams();

    const { loading, error, data } = useQuery(id ? QUERY_SINGLE_USER : QUERY_ME, {
        variables: { userId: id },
    });

    // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
    const user = data?.me || data?.profile || {};

    // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getUser().data._id === id) {
        return <Navigate to="/userProfile" />;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :(</p>;
    }

    if (!user?.username) {
        return (
            <Box p={4}>
                <Text>
                    You need to be logged in to see your profile page. Use the navigation links above to sign up or log in!
                </Text>
            </Box>
        );
    }

    return (
        <Box p={4} mt={10}>
            <Flex align="center" mb={6}>
                <Avatar size="lg" name={user.username} src="https://via.placeholder.com/150" mr={4} />
                <VStack align="start" spacing={1}>
                    <Heading size="lg">{user.username}</Heading>
                    <Text fontSize="sm">{user.email}</Text>
                </VStack>
            </Flex>

            <Divider />

            <Box mt={6}>
                <Heading size="md" mb={4}>
                    Created Events
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {user.createdEvents.map(event => (
                        <Flex borderWidth={1} rounded="md" key={event._id} justify="flex-end">
                            <Box flex="1" p={4} display="flex" flexDirection="column">
                                <Heading size="sm">{event.eventName}</Heading>
                                <Text fontSize="sm" mt={2}>
                                    {event.eventDescription}
                                </Text>
                                <Flex mt="auto" justifyContent="space-between" alignItems="flex-end">
                                    <Link to={`/event/${event._id}`}>
                                        <Button colorScheme="purple" size="sm" mr={2}>
                                            Visit Event
                                        </Button>
                                    </Link>
                                    <Button colorScheme="red" size="sm" leftIcon={<DeleteIcon />} ml={2}>
                                        Delete
                                    </Button>
                                </Flex>
                            </Box>
                            <Box
                                width="200px"
                                height="200px"
                                overflow="hidden"
                                roundedTopRight="md"
                                roundedBottomRight="md"
                            >
                                <Image
                                    src={event.mainImg}
                                    alt={event.eventName}
                                    height="100%"
                                    width="100%"
                                    objectFit="cover"
                                />
                            </Box>
                        </Flex>
                    ))}
                </SimpleGrid>
            </Box>

            <Divider />

            <Box mt={6}>
                <Heading size="md" mb={4}>
                    Assisting Events
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {user.assistingEvents.map(event => (
                        <Flex borderWidth={1} rounded="md" key={event._id} justify="flex-end">
                            <Box flex="1" p={4}>
                                <Heading size="sm">{event.eventName}</Heading>
                                <Text fontSize="sm" mt={2}>
                                    {event.eventDescription}
                                </Text>
                                <Link to={`/event/${event._id}`}>
                                    <Button
                                        colorScheme="purple"
                                        mt={12}
                                        ml={1}
                                        size="sm"
                                    >
                                        Visit Event
                                    </Button>
                                </Link>

                            </Box>
                            <Box
                                width="200px"
                                height="200px"
                                overflow="hidden"
                                roundedTopRight="md"
                                roundedBottomRight="md"
                            >
                                <Image
                                    src={event.mainImg}
                                    alt={event.eventName}
                                    height="100%"
                                    width="100%"
                                    objectFit="cover"
                                />
                            </Box>
                        </Flex>
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default UserDashboard;