import React from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './UserTable.css';

const UserTable = ({ users, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await API.delete(`/${id}`);
      toast.success('User deleted');
      onDelete();
    } catch {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-heading">User List</h2>
      {users.length === 0 ? (
        <p className="empty-message">No users found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
                <th>Phone</th>
                <th>PAN</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>•••••••••••</td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => onEdit(u)}>
                      <FaEdit />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(u._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
