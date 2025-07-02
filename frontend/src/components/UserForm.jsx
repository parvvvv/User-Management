import React, { useState, useEffect } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './UserForm.css';

const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const UserForm = ({ onSuccess, editUser, setEditUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pan: '',
  });

  const [showPan, setShowPan] = useState(false);

  useEffect(() => {
    if (editUser) setFormData(editUser);
  }, [editUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValid = () => {
    const { firstName, lastName, email, phone, pan } = formData;
    if (!firstName || !lastName || !email || !phone || !pan) {
      toast.error('All fields are required');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error('Phone number must be 10 digits');
      return false;
    }
    if (!panPattern.test(pan)) {
      toast.error('Invalid PAN format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    try {
      if (editUser) {
        await API.put(`/${editUser._id}`, formData);
        toast.success('User updated');
      } else {
        await API.post('/', formData);
        toast.success('User added');
      }

      setFormData({ firstName: '', lastName: '', email: '', phone: '', pan: '' });
      setEditUser(null);
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{editUser ? 'Edit User' : 'Add New User'}</h2>

      <div className="form-group">
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group pan-field">
        <input
          name="pan"
          placeholder="PAN Number"
          value={formData.pan}
          onChange={handleChange}
          type={showPan ? 'text' : 'password'}
          className="pan-input"
        />
        <span className="pan-toggle-icon" onClick={() => setShowPan(!showPan)}>
          {showPan ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button className="submit-button" type="submit">
        {editUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
