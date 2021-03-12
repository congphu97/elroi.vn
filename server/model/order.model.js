const mongoose = require("mongoose");

const order = new mongoose.Schema({
    idProduct: Array,
    totalPrice: Number,
    customer: String,
    address: Object,
    status: Boolean,
    createdAt: Number
});

module.exports = mongoose.model("order", order);
