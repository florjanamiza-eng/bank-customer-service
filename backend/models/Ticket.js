import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Në shqyrtim' }
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
