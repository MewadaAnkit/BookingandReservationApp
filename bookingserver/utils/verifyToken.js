const jwt = require('jsonwebtoken');
const createError = require('./error');

function verifyToken(req , res , next){
     const token = req.cookies.access_token;
     if(!token){
        return next(createError(401,"You are not authenticated"))
     }
     jwt.verify(token , process.env.JWT_SECRET,(err, user)=>{
        if(err){
            return next(createError(403,"Token is not valid"))
            req.user  = user;
            next();
        }
     })
}
function verifyUser(req,res){
    verifyToken(req,res ,()=>{
     if(req.user._id == req.params.id||req.user.isAdmin){
         next()
     }
     else{
         return next(createError(403,"You are not authorized"))
     }
 
    })
 
 }
function verifyAdmin(req,res , next){
   verifyToken(req,res ,()=>{
    if(req.user.isAdmin){
        next()
    }
    else{
        return next(createError(403,"You are not authorized"))
    }

   })

}
module.exports = verifyUser, verifyAdmin ;
     


