const express = require('express');
const router = express.Router();
const auth = require('../Controller/auth');
const hotels = require('../Controller/hotels');
const verifyUser = require('../utils/verifyToken')
const verifyAdmin = require('../utils/verifyToken');
const Room = require('../Controller/rooms');

//Authentication Routes
router.post('/api/register' , auth.register);
router.post('/api/login' , auth.login);
router.get('/api/users/:id' , auth.getUser,);
router.get('/api/users' , auth.getUsers);
router.put('/api/UpdateUser/:id'  ,auth.UpdateUser);
router.delete('/api/users/:id' , auth.deleteUser);

//Hotel CRUD Operations
router.post('/api/addhotel', hotels.addhotel)
router.put('/api/updatehotel/:id',verifyAdmin, hotels.updatehotel);
router.delete('/api/hotels/:id'  , hotels.deletehotel)
router.get('/api/hotels/:id' , hotels.getHotel);
router.get('/api/hotels' , hotels.getHotels);
router.get('/api/hotel/CountByCity' , hotels.getHotelByCity);
router.get('/api/hotels/CountByType' , hotels.getHotelByType);

//Rooms ROuter
router.post('/api/addroom/:id' , Room.CreatRoom)
router.put('/api/updateroom/:id',verifyAdmin, Room.updateRoom);
router.put('/api/availability/:id', Room.updateRoomAvail)
router.delete('/api/deleteroom/:id', verifyAdmin , Room.deleteRoom)
router.get('/api/getRoom/:id', verifyUser ,Room.getRoom);
router.get('/api/rooms'  , Room.getRooms)
router.get('/api/room/:id',Room.getroom)
router.get('/api/reserved/:id',Room.getReserved)

module.exports = router;