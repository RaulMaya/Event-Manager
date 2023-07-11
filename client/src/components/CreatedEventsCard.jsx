import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Button
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const CreatedEventCard = ({ event, handlerEdit, handlerDelete }) => {
    console.log(event)
    return (
        <Flex borderWidth={1} rounded="md" justify="flex-end">
            <Box flex="1" p={4}>
                <Flex direction="column" h="100%">
                    <Heading size="sm">{event.eventName}</Heading>
                    <Text noOfLines={2} fontSize="sm" mt={2}>
                        {event.eventDescription}
                    </Text>
                    <Flex mt="auto" justifyContent="start" alignItems="flex-end">
                        <Button w={"90px"} colorScheme="green" size="sm" mr={2} onClick={() => handlerEdit(event)}>
                            Edit Event
                        </Button>
                    </Flex>
                    <Flex mt="auto" justifyContent="start" alignItems="flex-end">
                        <RouterLink to={`/event/${event._id}`}>
                            <Button w={"90px"} colorScheme="purple" size="sm" mr={2}>
                                Visit Event
                            </Button>
                        </RouterLink>
                        <Button
                            w={"90px"}
                            colorScheme="red"
                            size="sm"
                            leftIcon={<DeleteIcon />}
                            ml={2}
                            onClick={() => handlerDelete(event._id)}
                        >
                            Delete
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

export default CreatedEventCard