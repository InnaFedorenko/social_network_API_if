const { application } = require('express');
const { Schema, model } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        // min: 1,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    },  
    id: false
});

// // Create the Reaction model using the reactionSchema
// const Reaction = model('Reaction', reactionSchema);

// Export the Reaction model
module.exports = reactionSchema;
