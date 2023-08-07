/** /api/users - Get, Post, Put, and Delete Users */

/** BONUS: Remove a user's associated thoughts when deleted.
    // /api/users/:userId/friends/:friendId
    // POST to add a new friend to a user's friend list
    // DELETE to remove a friend from a user's friend list
*/

const { User, Thought } = require('../models');

async function friendsCount(userId) {
    const user = await User.findById(userId);
    return user.friends.length;
  }

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
          // Find all users, exclude the 'friends' field and include the 'friendCount' virtual field
          const users = await User.find()
            .select('-__v -friends') // Exclude __v and friends field from the response
            .populate({ path: 'thoughts' })
            .lean();
      
        // Calculate the friendCount for each user and add it to the users object
        for (const user of users) {
            user.friendCount = await friendsCount(user._id);
        }
          res.json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    // GET a single user by its _id and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate({ path: 'thoughts' })
                .populate('friends', 'username'); // Populate the 'friends' field with the corresponding User documents, showing only their usernames

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST a new user:
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a user by its _id
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updates = req.body; // Assuming the request body contains the fields to update
            // Find the user by ID and update their information
            const updatedUser = await User.findOneAndUpdate(userId, updates, {
                new: true, // Return the updated user instead of the old one
            });
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    //DELETE to remove user by its _id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            // ToDo delete Friends - ?!
            res.json({ message: 'User and associated apps deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // /api/users/:userId/friends/:friendId
    // POST to add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a friend from a user's friend list
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }

};
