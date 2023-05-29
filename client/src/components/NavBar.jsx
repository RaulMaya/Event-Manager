import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const NavBar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="text-dark" to="/">
                    <h1 className="m-0" style={{ fontSize: '3rem' }}>
                        PartyMaster
                    </h1>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <div>
                            {Auth.loggedIn() ? (
                                <>
                                    <Link className="btn btn-lg btn-primary m-2" to="/createEvent">
                                        Create Event
                                    </Link>
                                    <Link className="btn btn-lg btn-primary m-2" to="/userProfile">
                                        User Profile
                                    </Link>
                                    <button className="btn btn-lg btn-light m-2" onClick={logout}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link className="btn btn-lg btn-primary m-2" to="/login">
                                        Login
                                    </Link>
                                    <Link className="btn btn-lg btn-light m-2" to="/signup">
                                        Signup
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;