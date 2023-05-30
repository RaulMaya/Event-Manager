import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CREATE_EVENT } from '../utils/mutations';
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
        <div className="container">
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="eventName" className="form-label">
                        Event Name
                    </label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        className="form-control"
                        value={formData.eventName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="eventCategory" className="form-label">
                        Event Category
                    </label>
                    <input
                        type="text"
                        id="eventCategory"
                        name="eventCategory"
                        className="form-control"
                        value={formData.eventCategory}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="eventDescription" className="form-label">
                        Event Description
                    </label>
                    <textarea
                        id="eventDescription"
                        name="eventDescription"
                        className="form-control"
                        value={formData.eventDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="mainImg" className="form-label">
                        Main Image URL
                    </label>
                    <input
                        type="text"
                        id="mainImg"
                        name="mainImg"
                        className="form-control"
                        value={formData.mainImg}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="portraitImg" className="form-label">
                        Portrait Image URL
                    </label>
                    <input
                        type="text"
                        id="portraitImg"
                        name="portraitImg"
                        className="form-control"
                        value={formData.portraitImg}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">
                        Tags (separated by comma)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        className="form-control"
                        value={formData.tags}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="eventStartDate" className="form-label">
                        Event Start Date
                    </label>
                    <input
                        type="date"
                        id="eventStartDate"
                        name="eventStartDate"
                        className="form-control"
                        value={formData.eventStartDate}
                        onChange={handleChange}
                    />

                </div>
                <div className="mb-3">
                    <label htmlFor="eventLocation" className="form-label">
                        Event Location
                    </label>
                    <input
                        type="text"
                        id="eventAddress"
                        name="address"
                        className="form-control"
                        value={formData.eventLocation.address}
                        onChange={handleLocationChange}
                        placeholder="Address"
                    />
                    <input
                        type="text"
                        id="eventCity"
                        name="city"
                        className="form-control"
                        value={formData.eventLocation.city}
                        onChange={handleLocationChange}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        id="eventCountry"
                        name="country"
                        className="form-control"
                        value={formData.eventLocation.country}
                        onChange={handleLocationChange}
                        placeholder="Country"
                    />
                    <input
                        type="text"
                        id="eventState"
                        name="state"
                        className="form-control"
                        value={formData.eventLocation.state}
                        onChange={handleLocationChange}
                        placeholder="State"
                    />
                    <input
                        type="number"
                        id="eventLatitude"
                        name="lat"
                        className="form-control"
                        value={formData.eventLocation.lat}
                        onChange={handleLocationChange}
                        placeholder="Latitude"
                    />
                    <input
                        type="number"
                        id="eventLongitude"
                        name="lon"
                        className="form-control"
                        value={formData.eventLocation.lon}
                        onChange={handleLocationChange}
                        placeholder="Longitude"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="eventType" className="form-label">
                        Event Type
                    </label>
                    <input
                        type="text"
                        id="eventType"
                        name="eventType"
                        className="form-control"
                        value={formData.eventType}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="eventCapacity" className="form-label">
                        Event Capacity
                    </label>
                    <input
                        type="number"
                        id="eventCapacity"
                        name="eventCapacity"
                        className="form-control"
                        value={formData.eventCapacity}
                        onChange={handleChange}
                    />
                </div>
{/* 
                <div className="mb-3">
                    <label htmlFor="eventInvitation" className="form-label">
                        Event Invitation
                    </label>
                    <input
                        type="checkbox"
                        id="eventInvitation"
                        name="eventInvitation"
                        className="form-check-input"
                        checked={formData.eventInvitation}
                        onChange={handleChange}
                    />
                </div> */}

                <div className="mb-3">
                    <label htmlFor="minAge" className="form-label">
                        Minimum Age
                    </label>
                    <input
                        type="number"
                        id="minAge"
                        name="minAge"
                        className="form-control"
                        value={formData.minAge}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create Event
                </button>
            </form>
        </div>
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