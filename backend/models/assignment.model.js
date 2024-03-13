const mongoose=require('mongoose');

const assingmentSchema=mongoose.Schema({
    "_id": ObjectId,
    "lecture_id": ObjectId, // Reference to Lectures Collection
    "title": String,
    "description": String,
    "due_date": Date,
    "submission_format": String,
    "submission_date": Date,
    "status": String, // Open, Closed, In Progress, etc.
    "attachments": [String], // Array of attachment URLs
    "author": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    }

})

const AssignmentModel=mongoose.model('assignement',assingmentSchema);

module.exports={AssignmentModel};
