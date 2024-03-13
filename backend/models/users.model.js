const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    "_id": ObjectId,
    "username": String,
    "password": String,
    "role": String, // Admin or Student
    "email": String,
})

const UserModal=mongoose.model('user',userSchema);

module.exports={UserModal};