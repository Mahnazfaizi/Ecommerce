const mongoose = require('mongoose');
const { Schema } = mongoose;

// this is the mongoDb cart model

const cartSchema = new Schema({
    productId: {
        ref: 'products',
        type: String
    },
    quantity: {
        type: Number
    },
    userId: {
        type: String
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('usercarts', cartSchema);