const bcryptjs = require('bcryptjs');
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

// this is the authentication controller to handle all the authentication related requests

const registerHandler = async (req,res) =>{
    
    
    try {
        const {name, email, password, profilePic} = req.body;
        const user = await Users.findOne({email});
        
        if(user) {
            throw new Error("User already registered");
        }
       
        if(!email || !password || !name) {
                throw new Error("Please provide all the fields");
            }
        const hashedPassword = await bcryptjs.hash( password, 10);

        const userData = new Users({
            name,
            email,
            profilePic,
            password: hashedPassword
        })

       const saveUser = await userData.save();

       res.status(200).json({
        data: saveUser,
        success: true,
        error: false,
        message: 'User created successfully'
       })

    } catch(err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })
        
    }
}

const loginHandler = async (req,res) =>{
    try {
        const { email, password } = req.body;

        if(!email) {
            throw new Error("Please enter an email address")
        }
        if(!password) {
            throw new Error("Please enter a password");
        }

        const user = await Users.findOne({email});
        if(!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(isMatch) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET,{expiresIn: '2h'});
            const tokenOptions = {
                httpOnly: true,
                secure: true,
            }
            res.status(200).cookie("token",token, tokenOptions).json({
                data:token,
                message: "Login successful",
                error: false,
                success: true
            })
        } else {
            throw new Error("Password mismatch");
        }

    } catch(err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

const logoutHandler = async (req, res) =>{
    try {
        
        res.clearCookie("token");
        res.json({
            message: "Logout successful",
            error: false,
            success: true,
            data: []
        })

    } catch(err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = {
    registerHandler,
    loginHandler,
    logoutHandler
}