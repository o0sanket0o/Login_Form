const jwt = require("jsonwebtoken");
require("dotenv").config();

const ensureAuth = (req, res, next) => {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(401).json({message: "Unauthorised access."});
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(403).json({message: "Unauthorized, JWT token expired or wrong"})
    }
    next();
}

module.exports = ensureAuth;