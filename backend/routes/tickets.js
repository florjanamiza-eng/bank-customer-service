import express from 'express';
import Ticket from '../models/Ticket.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tickets);
});

router.post('/', protect, async (req, res) => {
  const { type, message } = req.body;
  if (!type || !message) return res.status(400).json({ message: 'Plotëso tipin dhe mesazhin' });
  const ticket = await Ticket.create({ user: req.user._id, type, message });
  res.status(201).json(ticket);
});

export default router;
