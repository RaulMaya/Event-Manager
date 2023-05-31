import React from 'react';
import { format } from 'date-fns';
import { useMutation, useQuery } from '@apollo/client';
import { ATTEND_EVENT, CANCEL_EVENT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { Box, Grid, Image, Heading, Text, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

const EventList = ({ events }) => {
    const { loading, error, data, client } = useQuery(QUERY_ME);
    const eventAtt = data?.me?.assistingEvents || [];

    const [attendEvent] = useMutation(ATTEND_EVENT);
    const [cancelEvent] = useMutation(CANCEL_EVENT);

    const handleButtonClick = async (eventId) => {
        const isAttending = eventAtt.some((event) => event._id === eventId);
        try {
            if (isAttending) {
                await cancelEvent({ variables: { eventId } });
                const updatedEventAtt = eventAtt.filter((event) => event._id !== eventId);
                client.writeQuery({
                    query: QUERY_ME,
                    data: {
                        me: {
                            ...data.me,
                            assistingEvents: updatedEventAtt,
                        },
                    },
                });
            } else {
                await attendEvent({ variables: { eventId } });
                const updatedEventAtt = [...eventAtt, { _id: eventId }];
                client.writeQuery({
                    query: QUERY_ME,
                    data: {
                        me: {
                            ...data.me,
                            assistingEvents: updatedEventAtt,
                        },
                    },
                });
            }
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };

    return (
        <div className="row">
            {events && (
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {events.map((event) => (
                        <Box
                            key={event._id}
                            boxShadow="lg"
                            p="6"
                            rounded="md"
                            bg={useColorModeValue('white', 'gray.800')}
                            borderColor="purple.200"
                            borderWidth="1px"
                            minH="400px"
                            mb="5"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Image
                                borderRadius="md"
                                src={event.mainImg}
                                alt={event.eventName}
                                height="200px"
                                width="100%"
                                objectFit="cover"
                            />
                            <Box py="4">
                                <Heading fontSize="xl" color="purple.600" isTruncated>
                                    {event.eventName}
                                </Heading>
                                <Text noOfLines={2} color="gray.700">
                                    {event.eventDescription}
                                </Text>
                                <Text color="gray.500">
                                    <strong>Date:</strong> {format(new Date(event.eventStartDate), 'MMMM dd, yyyy')}
                                </Text>
                                <Text color="gray.500">
                                    <strong>Type:</strong> {event.eventType}
                                </Text>
                                <Text color="gray.500">
                                    <strong>Capacity:</strong> {event.eventCapacity}
                                </Text>
                            </Box>
                            <Flex justify="flex-start" mt="3">
                                <Button
                                    as={RouterLink}
                                    to={`/event/${event._id}`}
                                    colorScheme="purple"
                                    variant="outline"
                                    w="130px"
                                    mr="3"
                                    isTruncated
                                >
                                    See Event
                                </Button>
                                <Button
                                    colorScheme={
                                        eventAtt.some((eventAtt) => eventAtt._id === event._id) ? 'green' : 'purple'
                                    }
                                    onClick={() => handleButtonClick(event._id)}
                                    w="130px"
                                    isTruncated
                                >
                                    {eventAtt.some((eventAtt) => eventAtt._id === event._id) ? 'Assisting' : 'Attend Event'}
                                </Button>
                            </Flex>
                        </Box>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default EventList;
