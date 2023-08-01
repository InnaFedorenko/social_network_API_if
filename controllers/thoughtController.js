/** /api/thoughts - Get, Post, Put, and Delete Thoughts */
/** /api/thoughts/:thoughtId/reactions
POST to create a reaction stored in a single thought's reactions array field
DELETE to pull and remove a reaction by the reaction's reactionId value
*/
const router = require('express').Router();
const { User, Thought } = require('../models');

const reactionsCount = async (thoughtId) => {
    const thought = await Thought.findById(thoughtId);
    return thought.reactions.length;
}

module.exports = {
    // GET to get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .select('-__v -reactions').lean();
               // .populate({ path: 'reactions' });

        for (const thought of thoughts) {
            thought.reactionCount = await reactionsCount(thought._id);
        }
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET to get a single thought by its _id    
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .populate({ path: 'reactions' });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    /**  POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
      // example data
      {
      "thoughtText": "Here's a cool thought...",
      "username": "lernantino",
      "userId": "5edff358a0fcb779aa7b118b"
      }   
    */
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a thought by its _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a thought by its _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get reactions from a single thought
    async getReactions(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate({ path: 'reactions' });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //POST to create a reaction stored in a single thought's reactions array field
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {$addToSet: {reactions: req.body} },
                {new: true}
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //DELETE to pull and remove a reaction by the reaction's reactionId value   
    async deleteReaction(req, res) {
        //console.log(req.params.reactionId);
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId} },
                { new: true }
            );
           // console.log (thought.reactions);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}