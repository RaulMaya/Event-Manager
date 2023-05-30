import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ATTEND_EVENT, CANCEL_ATTEND_EVENT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const EventList = ({ events }) => {
    const [assistEvent] = useMutation(ATTEND_EVENT);
    const [cancelAssistEvent] = useMutation(CANCEL_ATTEND_EVENT);

    // Fetch current user's data
    const { loading, error, data: userData, refetch } = useQuery(QUERY_ME);

    const handleButtonClick = async (eventId, isAttending) => {
        try {
            console.log('eventId:', eventId);
            
            // Depending on whether the user is already attending, we either assist or cancel
            if (isAttending) {
                await cancelAssistEvent({
                    variables: {
                        eventId: eventId,
                    },
                });
            } else {
                await assistEvent({
                    variables: {
                        eventId: eventId,
                    },
                });
            }

            // After mutation, refetch the query
            refetch();
        } catch (e) {
            console.error(e);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :(</p>;
    }

    console.log('events:', events);

    return (
        <div className="row">
            {events &&
                events.map((event) => {
                    // Check if user is attending this event
                    const isAttending = userData.me.assistingEvents.some(userEvent => userEvent._id === event._id);

                    return (
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
                                            onClick={() => handleButtonClick(event._id, isAttending)}
                                            style={isAttending ? {backgroundColor: 'green'} : {}}
                                        >
                                            {isAttending ? "Cancel Assist" : "Add to Assisting"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default EventList;
