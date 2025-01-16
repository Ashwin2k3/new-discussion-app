import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
// const MessageSchema = new mongoose.Schema({
//   sender: { type: String, ref: 'User', required: true },
//   recipient: { type: String, ref: 'User', required: true },
//   message: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

const Message = mongoose.model('Message', MessageSchema);
export default Message;