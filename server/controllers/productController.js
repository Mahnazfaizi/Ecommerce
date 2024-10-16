const uploadProductPermission = require('../helper/permission');
const Products = require('../models/productModel');

// this is the controller for handling all the product related requests

const uploadProduct = async (req,res) =>{
    try {

        const sessionUserId = req.userId;
        if(!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied!")
        }

        const newProduct = new Products(req.body);
        const saveProduct = await newProduct.save();
        
        res.status(201).json({
            data: saveProduct,
            message: 'Product saved successfully',
            success: true,
            error: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Products.find().sort({ createdAt: -1});

        res.status(200).json({
            data: allProducts,
            message: "All products fetched",
            success: true,
            error: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        })
    }
}

const updateProduct = async (req, res) =>{
    try {
        
        const sessionUserId = req.userId;
        if(!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied!")
        }
        
        const {_id, ...data} = req.body;

        const updateProduct = await Products.findByIdAndUpdate(_id, data);

        res.json({
            data: updateProduct,
            message: "Product updated successfully",
            success: true,
            error: false
        })

    
    } catch(err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

const getProductByCategory = async (req, res) =>{
    try {
        const productsCategories = await Products.distinct("category");

        const productFromAlCategory = [];
        
        for(const category of productsCategories) {
            const product = await Products.findOne({category});
            if(product) {
                productFromAlCategory.push(product);
            }
        }
        
        res.json({
            data: productFromAlCategory,
            message: "Product from each category",
            success: true,
            error: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        })
    }
}


const getAllProductsByCategory = async (req,res) =>{
    try {
        const { category } = req?.body;
        const products = await Products.find({category});

        res.json({
            data: products,
            message: "All products from a particular category",
            success: true,
            error: false
        })

    } catch(err) {
        res.status(404).json({
            message: err.message,
            success: false,
            error: true
        })
    }
}

const getProductDetails = async (req,res) =>{
    try {
        const { productId } = req?.body;
        const product = await Products.findById(productId);

        res.json({
            data: product,
            message: "Fetched single product details",
            success: true,
            error: false
        })
    } catch(err) {
        res.status(404).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

const searchProduct = async (req, res) =>{
    try {
        const query = req?.query?.q;
        const regex = new RegExp(query,'i','g');
        const product = await Products.find({
            "$or": [
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        })
        res.json({
            data: product,
            message: "Searched products",
            success: true,
            error: false
        })
        console.log("query is -> ", query);
    } catch(err) {
        res.status(404).json({
            message: err.message,
            success: false,
            error: true
        })
    }
}

const filterProduct = async (req, res) =>{
    try {
        const categoryList = req?.body?.category || [];
        const product = await Products.find({
            category : {
                '$in' : categoryList
            }
        })
        res.json({
            data: product,
            success: true,
            error: false
        })
    } catch(err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        })
    }
}

module.exports = {
    uploadProduct,
    getAllProducts,
    updateProduct,
    getProductByCategory,
    getAllProductsByCategory,
    getProductDetails,
    searchProduct,
    filterProduct
}