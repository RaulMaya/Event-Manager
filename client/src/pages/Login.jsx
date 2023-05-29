import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [login, { loading, error, data }] = useMutation(LOGIN);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const { data } = await login({
                variables: { ...formData },
            });

            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
            // Handle error or display error message to the user
        }
        // clear form values
        setFormData({
            email: '',
            password: '',
        });
    };

    return (
        <div className="card">
            <h4 className="card-header bg-dark text-light p-2">Login</h4>
            <div className="card-body">
                {data ? (
                    <p>
                        Success! You may now head{' '}
                        <Link to="/">back to the homepage.</Link>
                    </p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            Log In
                        </button>
                        {error && <p>Error occurred. Please try again.</p>}
                    </form>)}
            </div>
        </div>
    );
};

export default LoginForm;