import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import ExcelUpload from './components/ExcelUpload';
import DownloadTemplate from './components/DownloadTemplate';
import API from './api';
import { FaUser } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const loadUsers = async () => {
    const res = await API.get('/');
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-heading gradient-text">
        <FaUser className="user-icon" />
        User Management System
      </h1>

      <UserForm onSuccess={loadUsers} editUser={editUser} setEditUser={setEditUser} />
      <UserTable users={users} onEdit={setEditUser} onDelete={loadUsers} />
      <ExcelUpload onUpload={loadUsers} />
      <DownloadTemplate />
    </div>
  );
};

export default App;
