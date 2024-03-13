const express=require('express');
const {UserModel}=require('../models/users.model');
const {BlackListModel}=require('../models/blacklist.model');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const userRoute=express.Router();

// User registration
userRoute.post('/register',async(req,res)=>{
    try{
       const {username,password,email}=req.body;
    if(password.length<8){
        return res.status(400).json({msg:"Password should be of 8 characters"})
    }
    const user=await UserModel.findOne({email});
    if(user){
        return res.status(500).json({msg:"User email already existes"});
    }
    bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            return res.status(500).json({msg:"Error Hashing password"});
        }
        const newUser=new UserModel({username,password:hash,email});
        await newUser.save();
        res.status(200).json({msg:"User Registered Successfully"});
    })
    }catch(err){
        res.status(500).json({msg:"Internal Server Error",err});
    }
})
// User Login

userRoute.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email&&password){
            res.status(400).json({msg:"Please enter all fields"});
        }
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const access_token=jwt.sign({userId:user._id},"masai")
                    res.status(200).json({msg:"Login Successful!!",access_token,user})
                }else{
                    res.status(200).json({msg:"Please Register,Wrong Credentials"});
                }
            })
        }else{
            res.status(200).json({msg:"User not found,Please Register"});
        }
    }catch(err){
        res.status(500).json({error:err});
    }
})

//to get user by ID

userRoute.get('/:id',async(req,res)=>{
   
    try{
        const userId=req.params.id
        const user= await UserModel.findOne({userId});
        if(user){
           res.status(200).json({user});
        }else{
            res.status(404).json({msg:"User not Found"});
        }
    }catch(err){
        res.status(400).json({Error:err});
    }
})

// Logout

userRoute.get('logout',async(req,res)=>{
    const access_token=req.headers.authorization?.split(" ")[1];
    try{
        const blacklist=new BlackListModel({access_token:access_token});
        await blacklist.save();
        res.status(200).json({msg:"Logout Successfull!!"});
    }catch(err){
        res.status(400).json({err:err});
    }
})



module.exports={userRoute};