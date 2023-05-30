import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CREATE_EVENT } from '../utils/mutations';
import {
    VStack,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    NumberInput,
    NumberInputField,
    Stack,
    Heading,
} from "@chakra-ui/react";

import Auth from '../utils/auth';

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

    const navigate = useNavigate(); // Initialize useNavigate

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
            console.log(data)
            // Redirect to the created event page or any other desired page
            navigate(`/event/${data.createEvent._id}`); // Use navigate function
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :(</p>;
    }

    return (
        <VStack spacing={8} py={12} align="start" m={4}>
            <Heading mb={6}>Create Event</Heading>
            <Box as="form" w="full" onSubmit={handleSubmit}>
                <FormControl id="eventName" isRequired>
                    <FormLabel>Event Name</FormLabel>
                    <Input type="text" name="eventName" value={formData.eventName} onChange={handleChange} />
                </FormControl>

                {/* Other fields go here with the same pattern */}

                <FormControl id="eventCategory" isRequired>
                    <FormLabel>Event Category</FormLabel>
                    <Input type="text" name="eventCategory" value={formData.eventCategory} onChange={handleChange} />
                </FormControl>

                <FormControl id="eventDescription" isRequired>
                    <FormLabel>Event Description</FormLabel>
                    <Textarea id="eventDescription" name="eventDescription" value={formData.eventDescription} onChange={handleChange} />
                </FormControl>

                {/* ... */}

                <FormControl id="minAge" isRequired>
                    <FormLabel>Minimum Age</FormLabel>
                    <NumberInput min={0}>
                        <NumberInputField id="minAge" name="minAge" value={formData.minAge} onChange={handleChange} />
                    </NumberInput>
                </FormControl>

                <Stack direction="row" mt={8} justify="center">
                    <Button colorScheme="purple" type="submit">
                        Create Event
                    </Button>
                </Stack>
            </Box>
        </VStack>
    );
};

export default CreateEventForm;

// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { useNavigate } from 'react-router-dom';
// import { CREATE_EVENT } from '../utils/mutations';

// const CreateEventForm = () => {
//     const [formData, setFormData] = useState({
//         eventName: '',
//         eventCategory: '',
//         eventDescription: '',
//         mainImg: null,
//         portraitImg: null,
//         tags: [],
//         eventStartDate: '',
//         eventLocation: {
//             address: '',
//             city: '',
//             country: '',
//             state: '',
//             lat: 0,
//             lon: 0,
//         },
//         eventType: '',
//         eventCapacity: 0,
//         eventInvitation: false,
//         minAge: 0,
//         createdBy: '',
//     });

//     const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         const name = e.target.name;

//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: file,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const { data } = await createEvent({
//                 variables: { ...formData },
//             });

//             navigate(`/event/${data.createEvent._id}`);
//         } catch (error) {
//             console.error('Error creating event:', error);
//         }
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error :(</p>;
//     }

//     return (
//         <div className="container">
//             <h1>Create Event</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="eventName" className="form-label">
//                         Event Name
//                     </label>
//                     <input
//                         type="text"
//                         id="eventName"
//                         name="eventName"
//                         className="form-control"
//                         value={formData.eventName}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="eventCategory" className="form-label">
//                         Event Category
//                     </label>
//                     <input
//                         type="text"
//                         id="eventCategory"
//                         name="eventCategory"
//                         className="form-control"
//                         value={formData.eventCategory}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="eventDescription" className="form-label">
//                         Event Description
//                     </label>
//                     <textarea
//                         id="eventDescription"
//                         name="eventDescription"
//                         className="form-control"
//                         value={formData.eventDescription}
//                         onChange={handleChange}
//                     ></textarea>
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="mainImg" className="form-label">
//                         Main Image
//                     </label>
//                     <input
//                         type="file"
//                         id="mainImg"
//                         name="mainImg"
//                         className="form-control"
//                         accept="image/png, image/jpeg, image/jpg"
//                         onChange={handleImageUpload}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="portraitImg" className="form-label">
//                         Portrait Image
//                     </label>
//                     <input
//                         type="file"
//                         id="portraitImg"
//                         name="portraitImg"
//                         className="form-control"
//                         accept="image/png, image/jpeg, image/jpg"
//                         onChange={handleImageUpload}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="tags" className="form-label">
//                         Tags (separated by comma)
//                     </label>
//                     <input
//                         type="text"
//                         id="tags"
//                         name="tags"
//                         className="form-control"
//                         value={formData.tags}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="eventStartDate" className="form-label">
//                         Event Start Date
//                     </label>
//                     <input
//                         type="date"
//                         id="eventStartDate"
//                         name="eventStartDate"
//                         className="form-control"
//                         value={formData.eventStartDate}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 {/* Add other form fields as needed */}

//                 <button type="submit" className="btn btn-primary">
//                     Create Event
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateEventForm;