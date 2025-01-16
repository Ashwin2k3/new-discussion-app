import express from 'express';
import { protect, authorize } from '../middlewares/auth.js';
import Query from '../models/Query.js';

const router = express.Router();

router.post('/add', protect, authorize('student'), async (req, res) => {
  try {
    const { student, message } = req.body;

    if (!student || !message) {
      return res.status(400).json({ error: 'Student and message are required' });
    }

    const newQuery = new Query({ student, message });
    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (error) {
    console.error('Error adding query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/mark-resolved', protect, authorize('mentor'), async (req, res) => {
  try {
    const { queryId } = req.body;

    if (!queryId) {
      return res.status(400).json({ error: 'Query ID is required' });
    }

    const query = await Query.findByIdAndUpdate(queryId, { status: 'Resolved' }, { new: true });
    res.status(200).json(query);
  } catch (error) {
    console.error('Error marking query as resolved:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/stats', protect, authorize('mentor'), async (req, res) => {
  try {
    const stats = await Query.aggregate([
      { $group: { _id: null, totalQueries: { $sum: 1 } } }
    ]);
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching query stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;