const User = require('../Model/User');
const bcrypt = require('bcrypt');
const createError = require('../utils/error');
const jwt = require('jsonwebtoken')
const auth = {
   async register(req, res) {

      try {
         const hashedpassword = await bcrypt.hash(req.body.password, 10)
         const newUser = new User({
            ...req.body,
            password: hashedpassword

         });
         await newUser.save();
         res.status(200).json('Registered Successfully')

      } catch (err) {
         res.status(500).json(err)

      }
   },
   async login(req, res, next) {
      try {
         const user = await User.findOne({ email: req.body.email })

         if (!user) {
            return next(createError(404, "User Not Found"))
         }

         const ispasswd = await bcrypt.compare(req.body.password, user.password);
         if (!ispasswd) {
            return next(createError(404, "Invalid Username or Password"))
         }

         const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

         //console.log('login success')
         res.cookie("access-token", token, {
            httpOnly: true,
         }).status(200).json(user)

      } catch (err) {
         res.status(400).json("Some error occured");
         console.log(err)
      }
   },
   async getUser(req,res , next){
      try {
         const user = await User.findById(req.params.id);
         res.status(200).json(user);
         
      } catch (err) {
          return next(err)
      }
   },
   
   async getUsers(req,res , next){
      try {
         const user = await User.find();
         res.status(200).json(user);
         
      } catch (err) {
          return next(err)
      }
   },
   async UpdateUser(req, res , next){
      try {
         const UpdatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
         res.status(200).json(UpdatedUser);
         
      } catch (err) {
          return next(err)
      }
   },
   async deleteUser(req,res , next){
      try {
         const deleteuser = await User.findByIdAndDelete(req.params.id);
         console.log('deleted success')
         res.status(200).json("User Deleted Successfully");
         
      } catch (err) {
          return next(err)
      }
   }
}

module.exports = auth