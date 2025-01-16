import express from 'express';
import { protect, authorize } from '../middlewares/auth.js';
import Event from '../models/Event.js';

const router = express.Router();

router.post('/add', protect, authorize('student'), async (req, res) => {
  try {
    const { student, suggestion } = req.body;

    if (!student || !suggestion) {
      return res.status(400).json({ error: 'Student and suggestion are required' });
    }

    const newEvent = new Event({ student, suggestion });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', protect, authorize('mentor'), async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;