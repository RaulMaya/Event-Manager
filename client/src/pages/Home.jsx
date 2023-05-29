import React from 'react';
import { useQuery, gql } from '@apollo/client';
import SingleEvent from '../components/singleEvent';

const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      eventName
      eventCategory
      eventDescription
      mainImg
      eventStartDate
      eventLocation
      eventType
      eventCapacity
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.events.map(event => (
        <SingleEvent key={event._id} event={event} />
      ))}
    </div>
  );
};

export default Home;
