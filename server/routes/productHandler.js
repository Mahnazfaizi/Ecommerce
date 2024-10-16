const router = require('express').Router();

const productController = require('../controllers/productController');
const authToken = require('../middleware/authToken');

// this handler handles all the product related requests and sends them to the product controller

router.post('/uploadProduct', authToken, (req,res)=>{productController.uploadProduct(req,res)});
router.post('/updateProduct', authToken, (req,res)=>{productController.updateProduct(req,res)});
router.post('/getAllProductsByCategory', (req,res)=>{productController.getAllProductsByCategory(req,res)});
router.post('/getProductDetails', (req,res)=>{productController.getProductDetails(req,res)});
router.post('/filterProduct', (req,res)=>{productController.filterProduct(req,res)});

router.get('/searchProduct', (req,res)=>{productController.searchProduct(req,res)});
router.get('/getAllProducts', (req,res)=>{productController.getAllProducts(req,res)});
router.get('/getByCategory', (req,res)=>{productController.getProductByCategory(req,res)});

module.exports = router;