const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user: {
        type: String,
        required: true
    },

    products: [
        {
            id: String,
            name: String,
            price: Number
        }
    ],

    total: {
        type: Number,
        required: true
    },

    orderDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Order", orderSchema);