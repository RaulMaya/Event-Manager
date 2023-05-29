import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_EVENTS);

  console.log('Event Data:', data); // Display event data in the console

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container">
      <h1 className="my-4">Events</h1>
      <div className="row">
        {data.events.map((event) => (
          <div key={event._id} className="col-md-4 mb-4">
            <div className="card">
              <img src={event.mainImg} className="card-img-top" alt={event.eventName} />
              <div className="card-body">
                <h5 className="card-title">{event.eventName}</h5>
                <p className="card-text">{event.eventDescription}</p>
                <p className="card-text">
                  <strong>Date:</strong> {event.eventStartDate}
                </p>
                <p className="card-text">
                  <strong>Location:</strong> {event.eventLocation.city}, {event.eventLocation.country}
                </p>
                <p className="card-text">
                  <strong>Type:</strong> {event.eventType}
                </p>
                <p className="card-text">
                  <strong>Capacity:</strong> {event.eventCapacity}
                </p>
                <div className="d-flex">
                  <button className="btn btn-primary m-2">See Event</button>
                  <button className="btn btn-secondary m-2">Add to Assisting</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: '20px' }}></div> {/* Margin at the bottom of all cards */}
    </div>
  );
};

export default Home;
