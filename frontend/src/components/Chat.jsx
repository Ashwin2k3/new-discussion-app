import React, { useState, useEffect } from 'react';
import { sendMessage, getMessages } from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your backend URL

const Chat = ({ senderId, recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMessages();

    socket.on('newMessage', (data) => {
      if (data.sender === recipientId) fetchMessages();
    });

    return () => socket.off('newMessage');
  }, [recipientId]);

  const fetchMessages = async () => {
    const { data } = await getMessages(senderId, recipientId);
    setMessages(data);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      await sendMessage({ sender: senderId, recipient: recipientId, message });
      setMessage('');
      fetchMessages();
    }
  };

  return (
    <div>
      <h3>Chat</h3>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;