import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ATTEND_EVENT } from '../utils/mutations';

console.log(Auth.getUser())

const EventList = ({ events }) => {
    const [assistEvent, { data }] = useMutation(ATTEND_EVENT);

    const handleButtonClick = async (eventId, userId) => {
        try {
            console.log('userId:', userId);
            console.log('eventId:', eventId);
            
            await assistEvent({
                variables: {
                    userId: userId,
                    eventId: eventId,
                },
                refetchQueries: [] // Opcional: si necesitas refrescar datos después de la mutación, especifica aquí las consultas que deben actualizarse
            });
        } catch (e) {
            console.error(e);
        }
    }

    console.log('events:', events);

    return (
        <div className="row">
            {events &&
                events.map((event) => (
                    <div key={event._id} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={event.mainImg}
                                className="card-img-top"
                                alt={event.eventName}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{event.eventName}</h5>
                                <p className="card-text">{event.eventDescription}</p>
                                <p className="card-text">
                                    <strong>Date:</strong> {event.eventStartDate}
                                </p>
                                <p className="card-text">
                                    <strong>Type:</strong> {event.eventType}
                                </p>
                                <p className="card-text">
                                    <strong>Capacity:</strong> {event.eventCapacity}
                                </p>
                                <div className="d-flex">
                                    <Link
                                        className="btn btn-block btn-squared btn-light text-dark"
                                        to={`/event/${event._id}`}
                                    >
                                        See Event
                                    </Link>
                                    <button 
                                        className="btn btn-secondary m-2"
                                        onClick={() => handleButtonClick(event._id, Auth.getUser().data._id)}
                                        style={data && data.assistEvent._id === event._id ? {backgroundColor: 'green'} : {}}
                                    >
                                        {data && data.assistEvent._id === event._id ? "Assisting" : "Add to Assisting"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default EventList;
