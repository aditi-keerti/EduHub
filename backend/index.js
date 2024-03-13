const express=require('express');
const {Connection}=require('./db');
const app=express();


app.get('/',(req,res)=>{
    res.send("Home Page");
})

app.listen(8080,async()=>{
    try{
        await Connection;
        console.log("Connected to DB")
        console.log("Server running at 8080")
    }catch(err){
        console.log(err);
    }
})
