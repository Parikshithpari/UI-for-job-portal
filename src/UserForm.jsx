import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserForm.css';

const roles = ['Backend_Developer_SpringBoot',
	'Backend_Developer_Python',
	'Full_Stack_Developer']; 

const UserForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    role: '',
    dateOfBirth: ''
  });

  const navigate = useNavigate();

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

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="userName" placeholder="Enter your User Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Enter your Email" onChange={handleChange} required />
      <select name="role" onChange={handleChange} required>
        <option value="">Select Role</option>
        {roles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
      <input type="date" name="dateOfBirth" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default UserForm;