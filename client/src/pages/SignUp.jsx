import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dateOfBirth: '',
    profilePic: '',
    password: '',
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createUser({
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
  );
};

export default SignUp;