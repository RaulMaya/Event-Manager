import React from 'react';
import { useMutation } from '@apollo/client';
import { ATTEND_EVENT } from '../utils/mutations';
import { Box, Grid, Image, Heading, Text, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

const EventList = ({ events }) => {
    const [assistEvent, { data }] = useMutation(ATTEND_EVENT);

    const handleButtonClick = async (eventId) => {
        try {
            console.log('eventId:', eventId);

            await assistEvent({
                variables: {
                    eventId: eventId,
                },
                // refetchQueries: [] // Opcional: si necesitas refrescar datos después de la mutación, especifica aquí las consultas que deben actualizarse
            });
        } catch (e) {
            console.error(e);
        }
    }

    console.log('events:', events);

    return (
        <div className="row">
            {events &&
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {events.map((event) => (
                        <Box key={event._id} boxShadow="lg" p="6" rounded="md" bg={useColorModeValue('white', 'gray.800')} borderColor="purple.200" borderWidth="1px" minH="400px" mb="5">
                            <Image
                                borderRadius="md"
                                src={event.mainImg}
                                alt={event.eventName}
                                height="200px"
                                width="100%"
                                objectFit="cover"
                            />
                            <Box py="4">
                                <Heading fontSize="xl" color="purple.600" isTruncated>{event.eventName}</Heading>
                                <Text noOfLines={2} color="gray.700">{event.eventDescription}</Text>
                                <Text color="gray.500"><strong>Date:</strong> {event.eventStartDate}</Text>
                                <Text color="gray.500"><strong>Type:</strong> {event.eventType}</Text>
                                <Text color="gray.500"><strong>Capacity:</strong> {event.eventCapacity}</Text>
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
                                        colorScheme={data && data.assistEvent._id === event._id ? 'green' : 'purple'}
                                        onClick={() => handleButtonClick(event._id)}
                                        w="130px"
                                        isTruncated
                                    >
                                        {data && data.assistEvent._id === event._id ? "Assisting" : "Attend Event"}
                                    </Button>
                                </Flex>
                            </Box>
                        </Box>
                    ))}
                </Grid>
            }
        </div>
    );
};

export default EventList;
