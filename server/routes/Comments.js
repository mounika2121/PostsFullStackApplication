const express = require('express');
const router = express.Router();

const { Comments } = require("../models");

const { validationToken } = require("../middlewares/Authmiddleware");

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: {PostId: postId}});
    res.json(comments);
});

router.post('/', validationToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
});

router.delete('/:commentId', validationToken, async (req, res) => {
    const commentId = req.params.commentId;

    try {
        const deletedCommentCount = await Comments.destroy({
            where: {
                id: commentId,
            },
        });

        if (deletedCommentCount === 0) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;