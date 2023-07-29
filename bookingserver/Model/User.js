const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
     username:{
        type:String,
        required:true,
        unique:true
     },
     email:{
      type:String,
      required:true,
      unique:true
     },
     img:{
        type:String,
     },
     password:{
       type:String,
       required:true
     },
     city:{
      type:String,
     
    },
    country:{
      type:String,
     
    },
    phone:{
      type:String,
    },
     isAdmin:{
       type:Boolean,
       default:false
     }
},{timestamps:true});



const User = mongoose.model('users', UserSchema);

module.exports = User;