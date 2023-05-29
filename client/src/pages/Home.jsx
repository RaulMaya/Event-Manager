import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_EVENTS } from '../utils/queries';
import EventList from '../components/EventList';

const Home = () => {
    const { loading, error, data } = useQuery(QUERY_ALL_EVENTS);
    const events = data?.events || [];
    console.log('Event Data:', events); // Display event data in the console

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="container">
            <h1 className="my-4">Events</h1>
            <div className="col-12 col-md-10 my-3">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <EventList
                        events={events}
                        title="Here's the current roster of friends..."
                    />
                )}
            </div>
            <div style={{ marginBottom: '20px' }}></div> {/* Margin at the bottom of all cards */}
        </div>
    );
};

export default Home;