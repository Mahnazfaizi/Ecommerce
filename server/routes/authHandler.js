const router = require('express').Router();

const authController = require('../controllers/authController');

// this handlers handles all the authentication related requates 
//and sends then to the auth controller

router.post('/register',(req,res)=>{authController.registerHandler(req,res)});
router.post('/login',(req,res)=>{authController.loginHandler(req,res)});
router.get('/logout', (req,res)=>{authController.logoutHandler(req,res)});

module.exports = router;