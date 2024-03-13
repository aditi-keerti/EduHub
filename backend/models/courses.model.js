const mongoose=require('mongoose');

const courseSchema=mongoose.Schema({
    "_id": ObjectId,
    "name": String,
    "description": String,
    "created_at": Date,
    "updated_at": Date
},{
    versionKey:false
})

const CourseModel=mongoose.model('course',courseSchema);

module.exports={CourseModel};