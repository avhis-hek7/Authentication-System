const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function userRegisterController (req,res){

    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"Plese input users credientials!"
        })
    }
    const isUserExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });
    if(isUserExists){
        return res.status(400).json({
            message:"User already exists with this email addresss!"
        })
    }

    const user = await userModel.create({
        username, email, password
    })

    const token = await user.generateToken();

    res.cookie(token, "token");

    return res.status(201).json({
        message:"User created successfully",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email
        },
        token
    })

}

async function getMeUseUserController (req,res){
    const token =  req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)

    res.status(200).json({
        message:"User fetched sucessfully",
        user:{
            username:user.username,
            email:user.email
        }
    })
}



module.exports = {userRegisterController, getMeUseUserController}