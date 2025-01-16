import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend URL
});

API.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          const response = await axios.post('http://localhost:3000/api/auth/refresh-token', { refreshToken });
          token = response.data.token;
          localStorage.setItem('token', token);
        }

        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Token error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const sendMessage = async (data) => {
  try {
    const response = await API.post('/messages/send', data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getMessages = async (sender, recipient) => {
  try {
    const response = await API.get('/messages/get', { params: { sender, recipient } });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const addQuery = async (data) => {
  try {
    const response = await API.post('/queries/add', data);
    return response.data;
  } catch (error) {
    console.error('Error adding query:', error);
    throw error;
  }
};

export const markResolved = async (queryId) => {
  try {
    const response = await API.patch('/queries/mark-resolved', { queryId });
    return response.data;
  } catch (error) {
    console.error('Error marking query as resolved:', error);
    throw error;
  }
};

export const getQueryStats = async () => {
  try {
    const response = await API.get('/queries/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching query stats:', error);
    throw error;
  }
};

export const addEvent = async (data) => {
  try {
    const response = await API.post('/events/add', data);
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await API.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export default API;