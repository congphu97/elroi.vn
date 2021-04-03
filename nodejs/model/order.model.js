const mongoose = require("mongoose");

const order = new mongoose.Schema({
    idProduct: Array,
    customerName: String,
    totalPrice: Number,
    numberPhone: Number,
    email: String,
    address: String,
    status: Boolean,
    createdAt: String
});

module.exports = mongoose.model("order", order);
