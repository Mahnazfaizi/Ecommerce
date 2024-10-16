const Users = require('../models/userModel');

// this is the controller handling all the user related requests

const getUserDetails = async(req,res) =>{
    try {
        const user = await Users.findById(req.userId);
        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

const getAllUsers = async (req,res) =>{
    try {
        const users = await Users.find();

        res.json({
            message: "All User details",
            data: users,
            error: false,
            success: true
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

const updateUser = async (req,res) =>{
    try {
        const sessionUser = req.userId;
        const { userId, name, email, role } = req.body;

        const updatedDetails = {
            ...( email && { email: email}),
            ...( name && {name: name}),
            ...( role && {role: role}),
        }

        const user = await Users.findById(sessionUser);

        const updateUser = await Users.findByIdAndUpdate(userId, updatedDetails);

        res.json({
            data: updateUser,
            message: "User Details updated",
            success: true,
            error: false,
        })

    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

module.exports = {
    getUserDetails,
    getAllUsers,
    updateUser,
}