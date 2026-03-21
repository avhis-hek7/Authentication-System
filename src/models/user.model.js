const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true, "Username is required"],
        unique:[true, "Username must be unique"]
    },
    email:{
        type:String,
        require:[true, "Email is required"],
        unique:[true, "Email must be unique"]
    },
    password:{
        type:String,
        require:[true, "Password must required"]
       
    },
    verified:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

// userSchema.pre("save", async function(){
//     if(!this.isModified('password')){
//         return 
//     }
//     const hash = await bcrypt.hash(this.password, 10)
//     this.password = hash;
//     return 

// })


 

// userSchema.methods.comaprePassword = async function (password){
//     return await bcrypt.compare(password, this.password)
// }

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
