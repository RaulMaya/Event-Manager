import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CREATE_EVENT } from '../utils/mutations';
import Auth from '../utils/auth';
import FormFields from '../components/FormsFields';
import {
    Box,
    Button,
    chakra,
    Grid,
    useToast,
    Spinner,
    Alert
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
            lat: 0,
            lon: 0,
        },
        eventCapacity: 0,
        eventInvitation: false,
        minAge: 0,
        createdBy: '',
    });

    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const valueType = type === "number" ? parseFloat(value) : value
        setFormData((prevData) => ({
            ...prevData,
            [name]: valueType,
        }));
    };

    const toast = useToast();

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        let valueType = value;

        if (["lon", "lat", "eventCapacity", "minAge"].includes(name)) {
            if (value.trim() === "") {
                valueType = "";
            } else {
                if (!/^-?\d*\.?\d+$/.test(value) && value !== "-") {
                    toast({
                        title: "Invalid Value",
                        description: "Please enter a valid number.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    return;
                }

                const parsedValue = parseFloat(value);

                if (name === "lat") {
                    if (parsedValue < -90 || parsedValue > 90) {
                        toast({
                            title: "Invalid Latitude",
                            description: "Latitude value must be between -90 and 90.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                        return;
                    }
                } else if (name === "lon") {
                    if (parsedValue < -180 || parsedValue > 180) {
                        toast({
                            title: "Invalid Longitude",
                            description: "Longitude value must be between -180 and 180.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                        return;
                    }
                }

                valueType = parsedValue.toString();
            }
        }

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
            console.log(data)
            // Redirect to the created event page or any other desired page
            navigate(`/event/${data.createEvent._id}`); // Use navigate function
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate('/signup');
        } else {
            const currentUser = Auth.getUser().data.username; // Update this line as per your auth library's implementation
            setFormData(prevData => ({
                ...prevData,
                createdBy: currentUser
            }));
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
        return <Alert status="error">{error.message} :(</Alert>;
    }

    return (
        <Box maxW="container.lg" mx="auto" p={6} borderWidth="1px" rounded="md" shadow="md" bg="white" mt={5} mb={5}>
            <chakra.h1 textAlign="center" fontSize="2xl" mb={4}>
                Create Event
            </chakra.h1>
            <chakra.form onSubmit={handleSubmit}>
                <FormFields name={"eventName"} text={"Event Name"} val={formData.eventName} handler={handleChange} type={"input"} />
                <FormFields name={"eventDescription"} text={"Event Description"} val={formData.eventDescription} handler={handleChange} type={"textarea"} />
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormFields name={"eventCategory"} text={"Event Category"} val={formData.eventCategory} handler={handleChange} type={"input"} />
                    <FormFields name={"mainImg"} text={"Main Image URL"} val={formData.mainImg} handler={handleChange} type={"input"} />
                    <FormFields name={"portraitImg"} text={"Portrait Image URL"} val={formData.portraitImg} handler={handleChange} type={"input"} />
                    <FormFields name={"tags"} text={"Tags"} val={formData.tags} handler={handleChange} type={"input"} />
                    <FormFields name={"eventStartDate"} text={"Event Start Date"} val={formData.eventStartDate} handler={handleChange} type={"date"} />
                    <FormFields name={"address"} text={"Event Address"} val={formData.eventLocation.address} handler={handleLocationChange} type={"input"} />
                    <FormFields name={"city"} text={"Event City"} val={formData.eventLocation.city} handler={handleLocationChange} type={"input"} />
                    <FormFields name={"country"} text={"Event Country"} val={formData.eventLocation.country} handler={handleLocationChange} type={"input"} />
                    <FormFields name={"lat"} text={"Event Latitude"} val={formData.eventLocation.lat} handler={handleLocationChange} type={"coords"} />
                    <FormFields name={"lon"} text={"Event Longitude"} val={formData.eventLocation.lon} handler={handleLocationChange} type={"coords"} />
                    <FormFields name={"eventCapacity"} text={"Event Capacity"} val={formData.eventCapacity} handler={handleChange} type={"nums"} />
                    <FormFields name={"minAge"} text={"Minimum Age"} val={formData.minAge} handler={handleChange} type={"nums"} />
                </Grid>
                <Button type="submit" colorScheme="purple" size="lg" w="100%">
                    Create Event
                </Button>
            </chakra.form>
        </Box>
    );
};

export default CreateEventForm;