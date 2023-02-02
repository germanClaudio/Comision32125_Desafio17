const Product = require("../models/products.models")

exports.getProducts = async () => {
    const products = await Product.find()
    return products
}

exports.getProductById = async id => {
    const product = await Product.findById(id)
    return product
}

exports.createProduct = async payload => {
    const newProduct = await Product.create(payload)
    return newProduct
}

exports.updateProduct = async (id, newValues) => {
    const product = await Product.findByIdAndUpdate(id, newValues, { new: true })
    return product
}

exports.deleteProductById = async id => {
    const product = await Product.findByIdAndRemove(id)
    return product
}

exports.deleteAllProducts = async () => {
    const products = await Product.deleteMany()
    return products
}