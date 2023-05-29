import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_EVENTS);

  console.log('Event Data:', data); // Display event data in the console

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const cardStyle = {
    height: '300px',
    overflowY: 'auto',
  };

  const imageStyle = {
    height: '200px',
    objectFit: 'cover',
  };

  return (
    <div className="container">
      <h1 className="my-4">Events</h1>
      <div className="row">
        {data.events.map((event) => (
          <div key={event._id} className="col-md-4 mb-4">
            <div className="card" style={{ height: '110%' }}>
              <img src={event.mainImg} style={imageStyle} className="card-img-top" alt={event.eventName} />
              <div className="card-body" style={cardStyle}>
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
                  <Link to={`/event/${event._id}`} className="btn btn-primary m-2">
                    See Event
                  </Link>
                  <button className="btn btn-secondary m-2">Add to Assisting</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
