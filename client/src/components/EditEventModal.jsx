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

const EditEventModal = () => {
    const { isOpen: isUpdateOpen, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();

    const handleSubmit = async (e) => {
        console.log(eventToUpdate)
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    return (
        {/* Update Event Modal */ }
        < Modal isOpen = { isUpdateOpen } onClose = { onCloseUpdate } >
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
            </Modal >
    )
}

export default EditEventModal