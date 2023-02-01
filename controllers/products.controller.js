const { getAllProducts } = require("../api/getAllProducts")
const { getProductById } = require("../api/getProductById")
const { createProduct } = require("../api/addProduct")
const { updateProduct } = require("../api/updateProduct")
const { deleteProductById } = require("../api/deleteProductById")
const { deleteAllProducts } = require("../api/deleteAllProducts")

exports.getAllProducts = async () => {
    const products = await getAllProducts()
    console.log('getAllProducts: ', getAllProducts)
    return products
}

exports.getProductById = async id => {
    const product = await getProductById(id)
    return product
}

exports.createProduct = async payload => {
    const newProduct = await createProduct(payload)
    return newProduct
}

exports.updateProduct = async id => {
    const product = await updateProduct(id)
    return product
}

exports.deleteProductById = async id => {
    const product = await deleteProductById(id)
    return product
}

exports.deleteAllProducts = async () => {
    const products = await deleteAllProducts()
    return products
}