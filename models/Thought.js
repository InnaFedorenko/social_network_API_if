const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    // Use ReactionsSchema to validate data for a reply
    reactions: [{reactionSchema}]
},
{
    toJSON: {
        virtual: true
    },
    id: false
});

// Virtual to get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
}
);

// Create the Thought model using the thoughtSchema
const Thought = model('thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;
