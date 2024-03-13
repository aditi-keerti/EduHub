const mongoose=require('mongoose');

const discussionSchema=mongoose.Schema({
    "_id": ObjectId,
    "lecture_id": ObjectId, // Reference to Lectures Collection
    "user_id": ObjectId, // Reference to Users Collection
    "message": String,
    "created_at": Date
},{
    versionKey:false
})

const DiscussionModel=mongoose.model('discussion',discussionSchema);

module.exports={DiscussionModel};