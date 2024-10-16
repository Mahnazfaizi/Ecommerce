const Users = require('../models/userModel');

// this function is used to check if the user have access to do particular request or not 

const uploadProductPermission = async (userId) =>{
    const user = await Users.findById(userId);
    if(user?.role !== 'ADMIN') {
        return false
    }
    return true;
}

module.exports = uploadProductPermission