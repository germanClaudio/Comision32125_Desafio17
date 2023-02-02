const { getAllProducts } = require("../api/getAllProducts")
const { getProductById } = require("../api/getProductById")
const { createProduct } = require("../api/addProduct")
const { updateProduct } = require("../api/updateProduct")
const { deleteProductById } = require("../api/deleteProductById")
const { deleteAllProducts } = require("../api/deleteAllProducts")

exports.getAllProducts = async () => {
    const products = await getAllProducts()
    console.log('getAllProducts (Products controller): ', products)
    return products
}

exports.getProductById = async id => {
    const product = await getProductById(id)
    console.log('getProductById (Products controller): ', product)
    return product
}

exports.createProduct = async payload => {
    const newProduct = await createProduct(payload)
    console.log('creaeProduct (Products controller): ', newProduct)
    return newProduct
}

exports.updateProduct = async id => {
    const product = await updateProduct(id)
    console.log('updateProduct (Products controller): ', product)
    return product
}

exports.deleteProductById = async id => {
    const product = await deleteProductById(id)
    console.log('deleteProduct (Products controller): ', product)
    return product
}

exports.deleteAllProducts = async () => {
    const products = await deleteAllProducts()
    console.log('deleteAllProduct (Products controller): ', products)
    return products
}