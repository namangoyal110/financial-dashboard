import React from 'react';
import axios from 'axios';

function Reports() {
  const handleSendReport = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/send`, {}, {
        headers: { Authorization: token },
      });
      alert('Report sent successfully');
    } catch (error) {
      alert('Error sending report');
    }
  };

  return (
    <div>
      <h2>Personalized Reports</h2>
      <button onClick={handleSendReport}>Send Weekly/Monthly Report</button>
    </div>
  );
}

export default Reports;