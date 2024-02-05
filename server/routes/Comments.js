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
    await Comments.create(comment);
    res.json(comment);
})

module.exports = router;