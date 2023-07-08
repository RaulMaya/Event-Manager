import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import { DELETE_EVENT, ATTEND_EVENT, CANCEL_EVENT, UPDATE_EVENT } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import {
    Box,
    Flex,
    Heading,
    Text,
    Divider,
    Input,
    VStack,
    FormControl,
    FormLabel,
    Avatar,
    Image,
    SimpleGrid,
    Button,
    useDisclosure,
    Modal,
    ModalCloseButton,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useToast,
    Spinner
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const UserDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading, error, data, refetch } = useQuery(id ? QUERY_SINGLE_USER : QUERY_ME, {
        variables: { userId: id },
    });

    const eventAtt = data?.me?.assistingEvents || [];

    const [attendEvent] = useMutation(ATTEND_EVENT, {
        refetchQueries: [{ query: id ? QUERY_SINGLE_USER : QUERY_ME }],
    });

    const [cancelEvent] = useMutation(CANCEL_EVENT, {
        refetchQueries: [{ query: id ? QUERY_SINGLE_USER : QUERY_ME }],
    });

    const [deleteEvent] = useMutation(DELETE_EVENT, {
        refetchQueries: [{ query: id ? QUERY_SINGLE_USER : QUERY_ME }],
    });

    const [updateEvent] = useMutation(UPDATE_EVENT);  // Define the updateEvent mutation function
    const [formData, setFormData] = useState({
        eventName: "",
        eventCategory: "",
        eventDescription: "",
        // ... Initialize other fields here with default values
    });
    
    const [eventToUpdate, setEventToUpdate] = useState(null)

    const handleUpdateEvent = (event) => {
        setEventToUpdate(event._id);
        console.log(event.id)
        console.log(eventToUpdate)
        setFormData({
            eventName: event.eventName,
            eventCategory: event.eventCategory,
            eventDescription: event.eventDescription,
            // ... other fields here
        });
        onOpenUpdate();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value)
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const { isOpen: isUpdateOpen, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

    const [eventToDelete, setEventToDelete] = useState(null);

    const toast = useToast();

    const handleButtonClick = async (eventId) => {
        const isAttending = eventAtt.some((event) => event._id === eventId);
        try {
            if (isAttending) {
                await cancelEvent({ variables: { eventId } });
                const updatedEventAtt = eventAtt.filter((event) => event._id !== eventId);
                refetch();
            } else {
                await attendEvent({ variables: { eventId } });
                const updatedEventAtt = [...eventAtt, { _id: eventId }];
                refetch();
            }
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        setEventToDelete(eventId);
        onOpenDelete();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEvent({ variables: { ...formData, updateEventId: eventToUpdate } });
            toast({
                title: 'Event Updated',
                description: 'The event has been updated successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onCloseUpdate();
            refetch();
        } catch (error) {
            console.error('Error updating event:', error);
            toast({
                title: 'Error',
                description: 'An error occurred while updating the event.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDeleteConfirmation = async (eventId) => {
        try {
            await deleteEvent({
                variables: { deleteEventId: eventId },
            });
            toast({
                title: 'Event Deleted',
                description: 'The event has been deleted successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onCloseDelete();
            refetch();
        } catch (error) {
            console.error('Error deleting event:', error);
            toast({
                title: 'Error',
                description: 'An error occurred while deleting the event.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate('/signup');
        }
    }, [navigate]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner color="purple.500" />
            </Box>
        );
    }

    if (error) {
        return <p>Error :(</p>;
    }

    const user = data?.me || data?.profile || {};

    return (
        <Box p={4} mt={10}>
            <Flex align="center" mb={6}>
                <Avatar size="lg" name={user.username} src={user.profilePic} mr={4} />
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
                    {user.createdEvents.map((event) => (
                        <Flex borderWidth={1} rounded="md" key={event._id} justify="flex-end">
                            <Box flex="1" p={4} display="flex" flexDirection="column">
                                <Heading size="sm">{event.eventName}</Heading>
                                <Text fontSize="sm" mt={2}>
                                    {event.eventDescription}
                                </Text>
                                <Flex mt="auto" justifyContent="space-between" alignItems="flex-end">
                                    <Button colorScheme="green" size="sm" mr={2} onClick={() => handleUpdateEvent(event)}>
                                        Edit Event
                                    </Button>
                                </Flex>
                                <Flex mt="auto" justifyContent="space-between" alignItems="flex-end">
                                    <RouterLink to={`/event/${event._id}`}>
                                        <Button colorScheme="purple" size="sm" mr={2}>
                                            Visit Event
                                        </Button>
                                    </RouterLink>
                                    <Button
                                        colorScheme="red"
                                        size="sm"
                                        leftIcon={<DeleteIcon />}
                                        ml={2}
                                        onClick={() => handleDeleteEvent(event._id)}
                                    >
                                        Delete
                                    </Button>
                                </Flex>
                            </Box>
                            <Box width="200px" height="200px" overflow="hidden" roundedTopRight="md" roundedBottomRight="md">
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
                    {user.assistingEvents.map((event) => (
                        <Flex borderWidth={1} rounded="md" key={event._id} justify="flex-end">
                            <Box flex="1" p={4}>
                                <Heading size="sm">{event.eventName}</Heading>
                                <Text fontSize="sm" mt={2}>
                                    {event.eventDescription}
                                </Text>
                                <Flex mt="auto" justifyContent="space-between" alignItems="flex-end">
                                    <Link to={`/event/${event._id}`}>
                                        <Button colorScheme="purple" mt={12} mr={2} size="sm">
                                            Visit Event
                                        </Button>
                                    </Link>
                                    <Button
                                        colorScheme={
                                            eventAtt.some((eventAtt) => eventAtt._id === event._id) ? 'green' : 'purple'
                                        }
                                        onClick={() => handleButtonClick(event._id)}
                                        ml={2}
                                        size="sm"
                                        isTruncated
                                    >
                                        {eventAtt.some((eventAtt) => eventAtt._id === event._id) ? 'Assisting' : 'Attend Event'}
                                    </Button>
                                </Flex>
                            </Box>
                            <Box width="200px" height="200px" overflow="hidden" roundedTopRight="md" roundedBottomRight="md">
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
            {/* Update Event Modal */}
            <Modal isOpen={isUpdateOpen} onClose={onCloseUpdate}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel>Event Name</FormLabel>
                                <Input type="text" name="eventName" value={formData?.eventName || ''} onChange={handleChange} />
                            </FormControl>
                            {/* Add other form controls here */}
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button onClick={onCloseUpdate}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Delete Event Modal */}
            <Modal isOpen={isDeleteOpen} onClose={onCloseDelete}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Event</ModalHeader>
                    <ModalBody>Are you sure you want to delete this event?</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" mr={3} onClick={onCloseDelete}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={() => handleDeleteConfirmation(eventToDelete)}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default UserDashboard;
