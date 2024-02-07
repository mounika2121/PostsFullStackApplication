const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const {sign} = require("jsonwebtoken");
const { validationToken } = require("../middlewares/Authmiddleware");

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    await bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        });
        res.json("SUCCESS");
    });
});


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ where: { username: username } });

        if (!user) {
            return res.json({ error: "User Doesn't Exist" }); 
        }

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
            if (!match) {
                return res.json({ error: "Wrong Username or Password" });
            }

            const accessToken = sign(
                {username: user.username, id: user.id},
                "importentsecret"
                );

            return res.json({token: accessToken, username: username, id: user.id});
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/auth", validationToken, (req, res) => {
    res.json(req.user);
})


module.exports = router;