const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    getReactions,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
  router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/reactions/:thoughtId
   router.route('/:thoughtId/reactions/')
   .get(getReactions)
   .post(addReaction);

//  /api/thoughts/:thoughtId/reactions/:reactionId
   router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;