const router = require('express').Router();

const userController = require('../controllers/userController');
const authToken = require('../middleware/authToken');

// this handler is used to handles all the user related requests and sends them to the user controller

router.get('/details', authToken, (req,res)=>{userController.getUserDetails(req,res)});
router.post('/updateuser', authToken, (req,res)=>{userController.updateUser(req,res)});
router.get('/allusers', authToken, (req,res)=>{userController.getAllUsers(req,res)});

module.exports = router;