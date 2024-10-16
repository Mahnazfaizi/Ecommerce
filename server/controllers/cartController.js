const Carts = require('../models/cartModel');

/// this controller handles all the user cart related requests

const addToCart = async (req,res) =>{
    try {
        const { productId } = req?.body;
        const sessionUser = req?.userId;

        const isAvailableProduct = await Carts.findOne({productId});
        if(isAvailableProduct) {
           return res.json({
            message: "Already exists in cart",
            success: false,
            error: true
           }) 
        }

        const cartObj = new Carts({
            productId: productId,
            quantity: 1,
            userId: sessionUser
        })

        await cartObj.save();

        res.json({
            data: cartObj,
            message: "Product add to cart",
            success: true,
            error: false
        })

    } catch(err) {
        res.status(400).json({
            message: err.message,
            success: true,
            error: false
        })
    }
}

const getQuantity = async (req,res) =>{
    try {
        const sessionUser = req?.userId;
        const quantity = await Carts.countDocuments({userId: sessionUser});

        res.json({
            data: {
                count: quantity
            },
            message: "Quantity fetched",
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

const getCartProducts = async (req,res) =>{
    try {
        const sessionUser = req?.userId;
        const cartItems = await Carts.find({userId: sessionUser}).populate("productId");

        res.json({
            data: cartItems,
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

const productQuantityUpdate = async (req,res) =>{
    try {
        const sessionUser = req?.userId;
        const currentQuantity = req.body.quantity;
        const productId = req.body.productId;
        console.log('Request Body:', req.body);

        const updatedProduct = await Carts.findOneAndUpdate(
            {_id: productId, userId: sessionUser},
            {$set: { quantity: currentQuantity} },
            { new: true }
        )
        await updatedProduct.save();

        res.status(201).json({
            data: [sessionUser, productId, currentQuantity],
            message: "Product quantity updated",
            success: true,
            error: false
        });
    } catch(err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        });
    }
}

const deleteItemFromCart = async (req,res) =>{
    try {

        const sessionUser = req?.userId;
        const productId = req.body.productId;

        const deleteProduct = await Carts.findOneAndDelete(
            {
                _id: productId,
                userId: sessionUser
            });

        res.json({
            message: "Item deleted from cart",
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
    addToCart,
    getQuantity,
    getCartProducts,
    productQuantityUpdate,
    deleteItemFromCart,
}