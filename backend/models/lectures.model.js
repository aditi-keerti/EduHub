const mongoose=require('mongoose');

const lectureSchema=mongoose.Schema({
    "_id": ObjectId,
    "course_id": ObjectId, // Reference to Courses Collection
    "title": String,
    "start_time": Date,
    "end_time": Date,
    "description": String,
    "link": String,
    "created_at": Date,
    "updated_at": Date
},{
    versionKey:false
})

const LectureModal=mongoose.model('lecture',lectureSchema);

module.exports={LectureModal};