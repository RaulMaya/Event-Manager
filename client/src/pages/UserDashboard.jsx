import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../utils/queries';
import Auth from '../utils/auth';

const UserDashboard = () => {
    const  id  = Auth.getUser()?.data._id
    console.log(id)
    const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { userId: id },
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :(</p>;
    }

    const { user } = data;

    return (
        <div className="container">
            <div className="row">
                {/* User Information Section */}
                <div className="col-md-4">
                    <h2>User Information</h2>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    {/* Add other user information */}
                </div>

                {/* User Created Events Section */}
                <div className="col-md-4">
                    <h2>Created Events</h2>
                    {user.createdEvents.map(event => (
                        <div key={event._id} className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{event.eventName}</h5>
                                <p className="card-text">{event.eventDescription}</p>
                                {/* Add other event details */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Assisting Events Section */}
                <div className="col-md-4">
                    <h2>Assisting Events</h2>
                    {user.assistingEvents.map(event => (
                        <div key={event._id} className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{event.eventName}</h5>
                                <p className="card-text">{event.eventDescription}</p>
                                {/* Add other event details */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;