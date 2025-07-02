import React from 'react';
import './DownloadTemplate.css';

const DownloadTemplate = () => {
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = 'http://localhost:5000/api/users/download-template';
    link.download = 'sample.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="download-section">
      <h2 className="download-heading">Download Sample Excel</h2>
      <button className="download-button" onClick={downloadFile}>
        Download Template
      </button>
    </div>
  );
};

export default DownloadTemplate;
