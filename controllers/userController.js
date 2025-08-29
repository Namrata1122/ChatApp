const users = require('../schemas/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    findUserByEmail,
    findUserByUsername,
    insertNewUser,
    getAllUsers
} = require('../services/userQueries');
require('dotenv').config();
const {BadRequestError} = require('../errors/badrequest');

const register = async(req,res)=>{
    const {username,email,password} = req.body;
    

    const userExists = await findUserByUsername(username);
    if(userExists){
        return res.status(400).json({message:`${username} already exists`});
    }else{
        const hashedPassword= await bcrypt.hash(password,10);
        newUser = await insertNewUser(username,email,hashedPassword);
    }
    const token = jwt.sign(
        {id:newUser.id,username:newUser.username,email:newUser.email},
        process.env.JWT_SECRET,{expiresIn:"30d"}
    )
    res.status(200).json({token,user:newUser});
}

const login = async(req,res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if(!email || !username || !password){
        throw new BadRequestError("Provide username, email and password");
    }

    const user = await findUserByEmail(email);
    if(!user){
        throw new BadRequestError("invalid username, email or password");
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        throw new BadRequestError("Invalid Password");
    }

    const token = jwt.sign({id:user.id,username:user.username,email:user.email},process.env.JWT_SECRET,{expiresIn:"10h"});

    res.status(200).json({message:"User LOgged in successfully",token,user});
}

const getAllusers = async(req, res)=>{
    const allusers = await getAllUsers();
    res.status(200).json({allusers});
}

module.exports = {register,login,getAllusers};