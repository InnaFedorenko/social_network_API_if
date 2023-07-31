/** /api/users - Get, Post, Put, and Delete Users */

/** BONUS: Remove a user's associated thoughts when deleted.
    // /api/users/:userId/friends/:friendId
    // POST to add a new friend to a user's friend list
    // DELETE to remove a friend from a user's friend list
*/ 

const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      //const users = await User.find();
      const users = await User.find()
      .populate({ path: 'thoughts'})
      .populate({ path: 'friends'}); // Populate the 'friends' field with the corresponding User documents, showing only their usernames

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET a single user by its _id and populated thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne( { _id: req.params.userId })
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
  /**  create a new user
  POST a new user:
    // example data
    {
      "username": "lernantino",
      "email": "lernantino@gmail.com"
    }
    */
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
};
