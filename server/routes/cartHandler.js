const router = require('express').Router();

const cartController = require('../controllers/cartController');
const authToken = require('../middleware/authToken');

// this handles handles all the cart related requests 
// and sends them to the cart controller

router.post('/addToCart', authToken, (req,res)=>{cartController.addToCart(req,res)});
router.post('/updateQuantity', authToken, (req,res)=>{cartController.productQuantityUpdate(req,res)});
router.post('/deleteItem', authToken, (req,res)=>{cartController.deleteItemFromCart(req,res)});

router.get('/getQuantity', authToken, (req,res)=>{cartController.getQuantity(req,res)});
router.get('/getCartProducts', authToken, (req,res)=>{cartController.getCartProducts(req,res)});

module.exports = router;