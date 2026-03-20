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

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    res.cookie("refreshToken", refreshToken, {
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000  
      })


    return res.status(201).json({
        message:"User created successfully",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email
        },
        accessToken
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

async function refreshTokenController(req,res){

    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message:"Refresh token is not found!"
        })
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const accessToken = jwt.sign({
        id:decoded.id
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"15m"
    })

    const newRefreshToken = jwt.sign({
        id:decoded.id
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"7d"
    })

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000  
      })
     



    

    

     res.status(200).json({
        message:"Access token refresh successfully",
        accessToken

    })
}



module.exports = {userRegisterController, getMeUseUserController, refreshTokenController}