import React from 'react';
import { Link } from 'react-router-dom';

const EventList = ({ events }) => {
    if (!events.length) {
        return <h3>No Events Yet</h3>;
    }

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
                                {/* <p className="card-text">
                            <strong>Location:</strong> {event.eventLocation.city}, {event.eventLocation.country}
                        </p> */}
                                <p className="card-text">
                                    <strong>Type:</strong> {event.eventType}
                                </p>
                                <p className="card-text">
                                    <strong>Capacity:</strong> {event.eventCapacity}
                                </p>
                                <div className="d-flex">
                                    <>
                                        <Link
                                            className="btn btn-block btn-squared btn-light text-dark"
                                            to={`/event/${event._id}`}
                                        >
                                            See Event
                                        </Link>
                                        <button className="btn btn-secondary m-2">Add to Assisting</button>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default EventList;
