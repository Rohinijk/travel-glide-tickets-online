
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
  id: String,
  number: String,
  isBooked: Boolean,
  price: Number
});

const BusSchema = new Schema({
  id: String,
  name: String,
  departureTime: String,
  arrivalTime: String,
  duration: String,
  price: Number,
  seatsAvailable: Number,
  rating: Number,
  busType: String,
  amenities: [String],
  seats: [SeatSchema]
});

const PassengerSchema = new Schema({
  name: String,
  age: String,
  gender: String,
  email: String,
  phone: String
});

const BookingSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  from: String,
  to: String,
  date: Date,
  selectedBus: BusSchema,
  selectedSeats: [SeatSchema],
  passenger: PassengerSchema,
  totalPrice: Number,
  bookingId: String,
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled', 'Pending'],
    default: 'Confirmed'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['online', 'cash'],
    default: 'online'
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
