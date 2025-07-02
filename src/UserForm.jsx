import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserForm.css';

const roles = [
  'Backend_Developer_SpringBoot',
  'Backend_Developer_Python',
  'Full_Stack_Developer'
];

const UserForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    role: '',
    dateOfBirth: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/oauthUser", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("User not authenticated");
        return res.json();
      })
      .then(data => {
        setFormData(prev => ({
          ...prev,
          userName: data.userName || "",
          email: data.email || ""
        }));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user info:", err);
        alert("Authentication required. Please login via OAuth2.");
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/registerUser', formData, {
        withCredentials: true
      });
      alert('User registered successfully');
    } catch (error) {
      if (error.response?.status === 409) {
        alert('User already registered');
      } else {
        alert('Registration failed');
        console.error(error);
      }
    }
  };

  if (loading) return <p>Loading user info...</p>;

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        name="userName"
        value={formData.userName}
        readOnly
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        readOnly
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="">Select Role</option>
        {roles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>

      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default UserForm;