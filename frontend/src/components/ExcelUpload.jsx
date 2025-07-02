import React, { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import './ExcelUpload.css';

const ExcelUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.xlsx')) {
      setFile(droppedFile);
    } else {
      toast.error('Please upload a valid .xlsx file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadFile = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.post('/bulk-upload', formData);
      toast.success(res.data.message);
      setFile(null);
      setErrors([]);
      onUpload();
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        setErrors(data.errors);
        toast.error('Errors found in uploaded file');
      } else {
        toast.error('Upload failed');
      }
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-heading">Bulk Upload Users</h2>

      <div
        className="upload-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('fileInput').click()}
        style={{
          border: '2px dashed #475569',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '1rem',
          cursor: 'pointer',
          background: '#0f172a',
        }}
      >
        <p>{file ? file.name : 'Click or Drag & Drop a .xlsx file here'}</p>
      </div>

      <div className="upload-controls">
        <input
          id="fileInput"
          type="file"
          accept=".xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="upload-input"
          style={{ display: 'none' }}
        />
        <button className="upload-button" onClick={uploadFile}>
          Upload
        </button>
      </div>

      {errors.length > 0 && (
        <div className="error-report">
          <h4>Error Summary:</h4>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>
                Row {err.row}: {err.errors.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
