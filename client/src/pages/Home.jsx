import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_EVENTS } from '../utils/queries';
import EventList from '../components/EventList';
import Auth from '../utils/auth';

const Home = () => {
    const { loading, error, data } = useQuery(QUERY_ALL_EVENTS);
    const events = data?.events || [];
    console.log(events)
    const user = Auth.getUser();
    console.log(user)
    const userId = user ? user.id : null;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="container">
            <h1 className="my-4">Trending Events</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <EventList
                    events={events}
                    title="All our events..."
                    userId={userId}
                />
            )}
            <div style={{ marginBottom: '20px' }}></div>
        </div>
    );
};

export default Home;
