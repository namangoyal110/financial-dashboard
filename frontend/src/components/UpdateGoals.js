import React, { useState } from 'react';
import axios from 'axios';

function UpdateGoals() {
  const [income, setIncome] = useState('');
  const [goals, setGoals] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/update`,
        { income, goals },
        { headers: { Authorization: token } }
      );
      alert('User information updated successfully');
    } catch (error) {
      alert('Error updating user information');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Income" value={income} onChange={(e) => setIncome(e.target.value)} required />
      <input type="text" placeholder="Goals" value={goals} onChange={(e) => setGoals(e.target.value)} required />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateGoals;