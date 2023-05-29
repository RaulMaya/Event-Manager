import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [login, { loading, error }] = useMutation(LOGIN);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: formData,
            });

            console.log(data); // Handle success or redirect to a new page
        } catch (error) {
            console.error(error);
            // Handle error or display error message to the user
        }
    };

    return (
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
        </form>
    );
};

export default LoginForm;