import React, { useState } from 'react';
import Chat from './components/Chat';
import Query from './components/Query';
import EventSuggestion from './components/EventSuggestion';
import Auth from './components/Auth';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  if (!token) {
    return <Auth setToken={handleSetToken} />;
  }

  const studentId = '12345'; // Replace with actual student ID
  const mentorId = '67890'; // Replace with actual mentor/admin ID

  return (
    <div>
      <h1>Student-Mentor Portal</h1>
      <Chat senderId={studentId} recipientId={mentorId} />
      <Query studentId={studentId} />
      <EventSuggestion studentId={studentId} />
    </div>
  );
};

export default App;