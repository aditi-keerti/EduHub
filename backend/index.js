const express=require('express');

const app=express();


app.get('/',(req,res)=>{
    res.send("Home Page");
})

app.listen(8080,()=>{
    console.log("Server running at 8080")
})
