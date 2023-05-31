import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_EVENT } from '../utils/mutations';
import {
    Box,
    Button,
    chakra,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Grid,
    useToast
} from "@chakra-ui/react";

const CreateEventForm = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        eventCategory: '',
        eventDescription: '',
        mainImg: '',
        portraitImg: '',
        tags: [],
        eventStartDate: '',
        eventLocation: {
            address: '',
            city: '',
            country: '',
            state: '',
            lat: 0,
            lon: 0,
        },
        eventType: '',
        eventCapacity: 0,
        eventInvitation: false,
        minAge: 0,
        createdBy: '',
    });

    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const valueType = type === "number" ? parseFloat(value) : value
        setFormData((prevData) => ({
            ...prevData,
            [name]: valueType,
        }));
    };

    const handleLocationChange = (e) => {
        const { name, value, type } = e.target;
        const valueType = type === "number" ? parseFloat(value) : value
        setFormData((prevData) => ({
            ...prevData,
            eventLocation: {
                ...prevData.eventLocation,
                [name]: valueType,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { data } = await createEvent({
                variables: { ...formData },
            });
    
            toast({
                title: "Event creation successful",
                description: `The event "${data.createEvent.eventName}" was created successfully`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
    
            navigate(`/event/${data.createEvent._id}`);
        } catch (error) {
            console.error('Error creating event:', error);
            toast({
                title: "Error creating event",
                description: `${error}`,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Box maxW="container.lg" mx="auto" p={6} borderWidth="1px" rounded="md" shadow="md" bg="white" mt={5} mb={5}>
            <chakra.h1 textAlign="center" fontSize="2xl" mb={4}>
                Create Event
            </chakra.h1>
            <chakra.form onSubmit={handleSubmit}>

                <FormControl mb={4}>
                    <FormLabel>Event Name</FormLabel>
                    <Input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        placeholder="Enter event name"
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Event Description</FormLabel>
                    <Textarea
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={handleChange}
                        placeholder="Enter event description"
                    />
                </FormControl>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl mb={4}>
                    <FormLabel>Event Category</FormLabel>
                    <Input
                        type="text"
                        name="eventCategory"
                        value={formData.eventCategory}
                        onChange={handleChange}
                        placeholder="Enter event category"
                    />
                </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Main Image URL</FormLabel>
                        <Input
                            type="text"
                            name="mainImg"
                            value={formData.mainImg}
                            onChange={handleChange}
                            placeholder="Enter main image URL"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Portrait Image URL</FormLabel>
                        <Input
                            type="text"
                            name="portraitImg"
                            value={formData.portraitImg}
                            onChange={handleChange}
                            placeholder="Enter portrait image URL"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Tags (separated by comma)</FormLabel>
                        <Input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="Enter tags"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Event Start Date</FormLabel>
                        <Input
                            type="date"
                            name="eventStartDate"
                            value={formData.eventStartDate}
                            onChange={handleChange}
                            placeholder="Enter event start date"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Event Address</FormLabel>
                        <Input
                            type="text"
                            name="address"
                            value={formData.eventLocation.address}
                            onChange={handleLocationChange}
                            placeholder="Enter event address"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Event City</FormLabel>
                        <Input
                            type="text"
                            name="city"
                            value={formData.eventLocation.city}
                            onChange={handleLocationChange}
                            placeholder="Enter event city"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Event Country</FormLabel>
                        <Input
                            type="text"
                            name="country"
                            value={formData.eventLocation.country}
                            onChange={handleLocationChange}
                            placeholder="Enter event country"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Event State</FormLabel>
                        <Input
                            type="text"
                            name="state"
                            value={formData.eventLocation.state}
                            onChange={handleLocationChange}
                            placeholder="Enter event state"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Event Latitude</FormLabel>
                        <Input
                            type="number"
                            name="lat"
                            value={formData.eventLocation.lat}
                            onChange={handleLocationChange}
                            placeholder="Enter event latitude"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Event Longitude</FormLabel>
                        <Input
                            type="number"
                            name="lon"
                            value={formData.eventLocation.lon}
                            onChange={handleLocationChange}
                            placeholder="Enter event longitude"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Event Type</FormLabel>
                        <Input
                            type="text"
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            placeholder="Enter event type"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Event Capacity</FormLabel>
                        <Input
                            type="number"
                            name="eventCapacity"
                            value={formData.eventCapacity}
                            onChange={handleChange}
                            placeholder="Enter event capacity"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Minimum Age</FormLabel>
                        <Input
                            type="number"
                            name="minAge"
                            value={formData.minAge}
                            onChange={handleChange}
                            placeholder="Enter minimum age"
                        />
                    </FormControl>
                </Grid>
                <Button type="submit" colorScheme="purple" size="lg" w="100%">
                    Create Event
                </Button>
            </chakra.form>
        </Box>
    );
};

export default CreateEventForm;