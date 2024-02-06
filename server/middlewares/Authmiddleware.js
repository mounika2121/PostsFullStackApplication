const { verify } = require("jsonwebtoken");

const validationToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({ error: "User not Logged In!"});

    try{
        const validToken = verify(accessToken, "importentsecret");
        req.user = validToken;
        if (validToken){
            return next();
        }
    }
    catch (err){
        return res.json({error: err});
    }
};

module.exports = {validationToken};