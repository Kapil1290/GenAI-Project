const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model') 


async function authUser(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Login first then go ahead"
        })  
    }

    const isBlackListed = await blacklistModel.findOne({token})
    
    if(isBlackListed){
        res.status(400).json({
            message:"Token blacklisted, login again pls"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();

    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

}

module.exports = {authUser};