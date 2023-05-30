import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const UserDashboard = () => {
    const { id } = useParams();

    const { loading, error, data } = useQuery(
        id ? QUERY_SINGLE_USER : QUERY_ME,
        {
            variables: { userId: id },
        }
    );

    // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
    const user = data?.me || data?.profile || {};

    // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getUser().data._id === id) {
        return <Navigate to="/userProfile" />;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :(</p>;
    }

    console.log(user)
    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see your profile page. Use the navigation
                links above to sign up or log in!
            </h4>
        );
    }

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