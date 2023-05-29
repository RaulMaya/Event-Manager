import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_EVENTS);

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
                  <strong>Category:</strong> {event.eventCategory}
                </p>
                <p className="card-text">
                  <strong>Date:</strong> {event.eventStartDate}
                </p>
                <p className="card-text">
                  <strong>Location:</strong> {event.eventLocation}
                </p>
                <p className="card-text">
                  <strong>Type:</strong> {event.eventType}
                </p>
                <p className="card-text">
                  <strong>Capacity:</strong> {event.eventCapacity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
