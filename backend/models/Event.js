import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  suggestion: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  timestamp: { type: Date, default: Date.now },
});

const Event = mongoose.model('Event', EventSchema);
export default Event;




