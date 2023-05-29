import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dateOfBirth: '',
    profilePic: '',
    password: '',
  });

  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);

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
      const { data } = await createUser({
        variables: { ...formData },
      });

      Auth.login(data.createUser.token); // Handle success or redirect to a new page
    } catch (error) {
      console.error(error);
      // Handle error or display error message to the user
    }
  };

  return (
    <div className="card">
      <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="form-control"
                placeholder="Date of Birth"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
                className="form-control"
                placeholder="Profile Picture"
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
              Sign Up
            </button>
            {error && <p>Error occurred. Please try again.</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;