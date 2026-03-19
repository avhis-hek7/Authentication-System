const userModel = require('../models/user.model');

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
module.exports = {userRegisterController}