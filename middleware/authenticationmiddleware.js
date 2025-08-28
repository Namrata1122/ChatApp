const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/unautheticated')
require('dotenv').config();

const authenticationMiddleware = async(req,res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No Token Provided');
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {id,username,email} = decoded;
        req.user = {id,username,email}
        next();
    }catch(err){
        throw new UnauthenticatedError('user not authenticated');
    }
}

module.exports = authenticationMiddleware;