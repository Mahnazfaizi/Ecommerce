const jwt = require('jsonwebtoken');

// this function check that the user is authenticated or not by checking the token

const authToken = async (req,res,next) =>{
    try {
        const token = req.cookies?.token;

        if(!token) {
            return res.status(200).json({
                message: "User not logged in!!",
                error: true,
                success: false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
            if(err) {
                console.log(err);
            }

            req.userId = decoded?._id;
            next();
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            data: [],
            error: true,
            success: false
        })
    }
}

module.exports = authToken;