const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
{
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type:String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],

    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user', // Self-reference to the User model
        },
      ],
},
{
    toJSON: {
        virtual: true
    },
    toObject: {
        virtual: true
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;
