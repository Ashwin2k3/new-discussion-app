import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `/api/auth/${isSignup ? 'signup' : 'login'}`;
    const payload = isSignup ? { email, password, role } : { email, password };

    try {
      const { data } = await axios.post(url, payload);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        setToken(data.token);
      }
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      {isSignup && (
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>
      )}
      <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      <button type="button" onClick={() => setIsSignup(!isSignup)}>
        Switch to {isSignup ? 'Login' : 'Signup'}
      </button>
    </form>
  );
};

export default Auth;