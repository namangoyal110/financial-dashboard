import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Suggestions() {
  const [suggestions, setSuggestions] = useState('');

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/suggestions`, {
          headers: { Authorization: token },
        });
        setSuggestions(response.data.suggestions);
      } catch (error) {
        alert('Error fetching saving suggestions');
      }
    };
    fetchSuggestions();
  }, []);

  return (
    <div>
      <h2>Smart Saving Suggestions</h2>
      <p>{suggestions}</p>
    </div>
  );
}

export default Suggestions;