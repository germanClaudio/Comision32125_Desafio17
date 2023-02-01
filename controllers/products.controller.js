const Product = require("../models/products.models")

exports.getAllProducts = async () => {
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

exports.updateProduct = async id => {
    const product = await Product.findByIdAndUpdate(id)
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



// const Repository = require("../container/repository")

// const { GetAllProducts } = require("../api/getAllProducts")
// const { getProductById } = require("../api/getProductById")
// const { createProduct } = require("../api/addProduct")
// const { updateProduct } = require("../api/updateProduct")
// const { deleteProductById } = require("../api/deleteProductById")
// const { deleteAllProducts } = require("../api/deleteAllProducts")

// class ProductsController {  
//     constructor(){
//         this.products = new Repository()
//         // this.getAllProducts = new GetAllProducts()
//         // this.getProductById = new getProductById()
//         // this.createProduct = new createProduct()
//         // this.updateProduct = new updateProduct()
//         // this.deleteProductById = new deleteProductById()
//         // this.deleteAllProducts = new deleteAllProducts()
//     }

    // exports.getAllProducts = async (req, res) => {
    //     const productos = await this.products.getAllProducts()
    //     if(productos.error) return res.status(400).json({msg: 'No hay productos cargados'}) 
    //     res.status(200).json(productos)
    // }
    

    // getProductById = async (req, res) => {
    //     const { id } = req.params
    //     const producto = await this.products.getProductById(id)
    //     if(!producto) return res.status(404).json({msg: 'Producto no encontrado'})
    //     res.status(200).json( producto )
    // }

    // createProduct = async (req, res) => {
    //     const producto = await this.createProduct(req.body)
    //     res.status(201).json(producto)
    // }

    // updateProduct = async (req, res) => {
    //     const { id } = req.params
    //     const producto = await this.updateProduct(id, req.body)
    //     res.status(200).json(producto)
    // }

    // deleteProductById = async (req, res) => {
    //     const { id } = req.params
    //     const producto = await this.deleteProductById(id)
    //     res.status(200).json(producto)
    // }

    // deleteAllProducts = async () => {
    //     await this.deleteAllProducts()
    //     res.status(200).json({msg: 'Base de datos vacía'})
    // }

// }

// module.exports = { ProductsController }