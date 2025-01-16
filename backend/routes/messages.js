import express from 'express';
import { protect, authorize } from '../middlewares/auth.js';
import Message from '../models/Message.js';

const router = express.Router();

router.post('/send', protect, authorize('student', 'mentor'), async (req, res) => {
  try {
    const { sender, recipient, message } = req.body;

    // console.log(sender, recipient, message);



    if (!sender || !recipient || !message) {
      return res.status(400).json({ error: 'Sender, recipient, and message are required' });
    }

    const newMessage = new Message({ sender, recipient, message });
    await newMessage.save();

    const io = req.app.get('socketio');
    io.emit('newMessage', { sender, message });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/get', protect, authorize('student', 'mentor'), async (req, res) => {
  try {
    const { sender, recipient } = req.query;

    if (!sender || !recipient) {
      return res.status(400).json({ error: 'Sender and recipient are required' });
    }

    const messages = await Message.find({ sender, recipient });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;