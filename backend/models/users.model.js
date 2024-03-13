const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    "username": {type:String},
    "password":  {typeof:String,required:true},
    "role": String, // Admin or Student
    "email":  {typeof:String,required:true},
},{
    versionKey:false
})

const UserModel=mongoose.model('user',userSchema);

module.exports={UserModel};