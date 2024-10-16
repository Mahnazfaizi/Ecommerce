const mongoose = require('mongoose');
const { Schema } = mongoose;

// this is the mongoDb product model

const productSchema = new Schema({
    productName: {
        type: String,
    },
    productBrand: {
        type: String,
    },
    category: {
        type: String,
    },
    productImage: {
        type: Array,
        default: []
    },
    description: {
        type: String,
    },
    price: {
        type: Number
    },
    sellingPrice: {
        type: Number
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('products',productSchema);