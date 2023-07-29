const Hotel = require('../Model/Hotel')
const hotels = {

    async getHotel(req, res, next) {
        try {
            const hotel = await Hotel.findById(req.params.id);
            res.status(200).json(hotel)
        } catch (err) {
            next(err)
        }
    },


    async getHotels(req, res, next) {
        const { min, max, ...others } = req.query;
        
        try {
          const hotels = await Hotel.find({
            ...others,
            cheapestprice: { $gt: min | 1, $lt: max || 999 },
          }).limit(req.query.limit);
         // console.log(hotels)
          res.status(200).json(hotels);

        } catch (err) {
          next(err);
        }
    },


    async getHotelByCity(req, res, next) {
        const cities = req.query.cities.split(",");
        try {
            const list = await Promise.all(cities.map(city => {
                return Hotel.countDocuments({ city: city });
            }));
            console.log(list)
            res.status(200).json(list)

        } catch (err) {
            next(err)
        }

    },
    async getHotelByType(req, res, next) {
        try {
            const hotelCount = await Hotel.countDocuments({ type: "hotel" })
            const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
            const resortCount = await Hotel.countDocuments({ type: "resort" })
            const villaCount = await Hotel.countDocuments({ type: "villa" })
            const cabinCount = await Hotel.countDocuments({ type: "cabin" })
            res.status(200).json([
                { type: "hotel", count: hotelCount },
                { type: "apartment", count: apartmentCount },
                { type: "resort", count: resortCount },
                { type: "villa", count: villaCount },
                { type: "cabin", count: cabinCount }
            ])

        } catch (err) {
            next(err)
        }

    },



    async addhotel(req, res) {
        const newHotel = new Hotel(req.body);
        try {
            const savedHotel = await newHotel.save();
            res.status(200).json(savedHotel);
        } catch (err) {
            res.status(400).json(err)
        }
    },



    async updatehotel(req, res) {
        try {
            const id = req.params.id;
            const updateHotel = await Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
            res.status(200).json(updateHotel);
        } catch (err) {
            res.status(400).json(err)
        }
    },


    async deletehotel(req, res) {
        try {
            const id = req.params.id;
            const deleteHotel = await Hotel.findByIdAndDelete(id);
            res.status(200).json("Deleted Successfully");
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

module.exports = hotels;