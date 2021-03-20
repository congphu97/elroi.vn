const mongoose = require("mongoose");

const product = new mongoose.Schema({
    productName: String,
    category: String,
    note: String,
    price: Number,
    priceSale: Number,
    size: String,
    status: String,
    imgProduct: Array,
    createdAt: Number,
    updatedAt: Number
});

module.exports = mongoose.model("product", product);
