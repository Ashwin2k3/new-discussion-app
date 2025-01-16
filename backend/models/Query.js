import mongoose from 'mongoose';

const QuerySchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
  timestamp: { type: Date, default: Date.now },
});

const Query = mongoose.model('Query', QuerySchema);
export default Query;