const mongoose = require('mongoose');
const User = require('./User')
const RoomSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
   
  },
  title: {
    type: String,
    required: true,

  },
  price: {
    type: Number,
    required: true,

  },
  maxPeople: {
    type: Number,
    required: true,

  },
  desc: {
    type: String,
    required: true
  },
  roomNumbers: [{ number: Number, unavailableDates: [{ type: Date }] }]
}, { timestamps: true });



const Rooms = mongoose.model('room', RoomSchema);

module.exports = Rooms;