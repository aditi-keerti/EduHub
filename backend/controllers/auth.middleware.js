const jwt=require('jsonwebtoken');
const {BlackListModel}=require('../models/blacklist.model');
const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(await BlackListModel.findOne({access_token})){
        return res.json({msg:"You have been logged out"})
    }
    if(token){
        try{
            const decoded=jwt.verify(token,"masai");
            if(decoded){
                req.body.userId=decoded.userId;
                req.body.username=decoded.username;
                next();
            }else{
                res.json({msg:"Not Authorized"});
            }
        }catch(err){
            console.log(err);
        }
    }else{
        res.json({msg:"Please Login"});
    }
}
module.exports={auth};