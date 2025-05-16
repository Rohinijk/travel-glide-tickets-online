
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookingsRouter = require('./routes/bookings');
const usersRouter = require('./routes/users');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connection established'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/bookings', bookingsRouter);
app.use('/api/users', usersRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'TravelGlide API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
