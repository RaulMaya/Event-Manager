import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Button,
    Spacer
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AssistingEventCard = ({ event, eventAtt, handler }) => {
    return (
        <Flex borderWidth={1} rounded="md" key={event._id} justify="flex-end">
            <Box flex="1" p={4}>
                <Flex direction="column" h="100%">
                    <Heading size="sm">{event.eventName}</Heading>
                    <Text noOfLines={2} fontSize="sm" mt={2}>
                        {event.eventDescription}
                    </Text>
                    <Flex mt="auto" justifyContent="start" alignItems="flex-end">
                        <Link to={`/event/${event._id}`}>
                            <Button w={"90px"} colorScheme="purple" mr={2} size="sm">
                                Visit Event
                            </Button>
                        </Link>
                        <Button
                            colorScheme={
                                eventAtt.some((eventAtt) => eventAtt._id === event._id) ? 'green' : 'purple'
                            }
                            onClick={() => handler(event._id)}
                            ml={2}
                            size="sm"
                            w={"90px"}
                            isTruncated
                        >
                            {eventAtt.some((eventAtt) => eventAtt._id === event._id) ? 'Assisting' : 'Attend Event'}
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            <Box width="200px" height="210px" overflow="hidden" roundedTopRight="md" roundedBottomRight="md">
                <Image
                    src={event.mainImg}
                    alt={event.eventName}
                    height="100%"
                    width="100%"
                    objectFit="cover"
                />
            </Box>
        </Flex>
    )
}

export default AssistingEventCard