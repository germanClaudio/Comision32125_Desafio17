const { Schema, model } = require('mongoose')

let itemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less than 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamp: true
})
const cartSchema = new Schema({
    items: [itemSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamp: true  
})

module.exports = model('Carts', cartSchema)