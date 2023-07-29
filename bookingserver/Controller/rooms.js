const Hotel = require('../Model/Hotel');
const Rooms = require('../Model/Room');
const createError = require('../utils/error')

const Room ={
    async CreatRoom(req,res,next){
        const hotelid = req.params.id;
        const newRoom = new Rooms(req.body)
     try {
        const savedRoom = await  newRoom.save()
        
        try {
            await Hotel.findByIdAndUpdate(hotelid , {$push:{rooms:savedRoom._id}})
            
        } catch (err) {
            next(err)
        }

        res.status(200).json(savedRoom)
        
     } catch (err) {
        return next(err)
        
     }
    },async updateRoom(req,res){
        try {
            const id = req.params.id;
            const updateRoom = await Rooms.findByIdAndUpdate(id , {$set:req.body},{new:true});
           res.status(200).json(updateRoom);
       } catch (err) {
           res.status(400).json(err)
       }
     },
     async updateRoomAvail(req,res,next){
        try {
            await Rooms.updateOne(
              { "roomNumbers._id": req.params.id },
              {
                $push: {
                  "roomNumbers.$.unavailableDates": req.body.dates,
                  "userId":req.body.userId
                },
              }
            );
            console.log("Room Status updated")
            res.status(200).json("Room status has been updated.");
          } catch (err) {
            next(err);
          }
        
     },
     async deleteRoom(req,res){
        try {
            const id = req.params.id;
            const deleteRoom = await Rooms.findByIdAndDelete(id);
           res.status(200).json("Deleted Successfully");
       } catch (err) {
           res.status(400).json(err)
       }
     },
     async getRoom(req,res , next){
        try {
           const room = await Rooms.findById(req.params.id);
           res.status(200).json(room);
           
        } catch (err) {
            return next(err)
        }
     },
     
     async getRooms(req , res , next){
        try {
           const room = await Rooms.find();
           console.log('endpoint called')
           res.status(200).json(room);
           
        } catch (err) {
            return next(err)
        }
     },
     async getroom(req,res,next){
        try {
            const id = req.params.id;
            const hotel =  await Hotel.findById(id).exec();
           
            const list = await Promise.all(
                hotel.rooms.map((room)=>{
                    return Rooms.findById(room);
                })
            )
            res.status(200).json(list)
            
        } catch (err) {
               next(err)
        }
     },
     async getReserved(req,res,next){
        try {
            const userId = req.params.id;
        
    
            const bookedRooms = await Rooms.find({ userId });
        
    
            const roomIds = bookedRooms.map((room) => room._id);
        
        
            const bookedHotels = await Hotel.find({ rooms: { $in: roomIds } });
        

            const profileInfo = {
              bookedRooms,
              bookedHotels,
            
            };
        
            res.json(profileInfo);
          } catch (err) {
            next(err);
          }
     }
}


module.exports = Room;