const { Router } = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')
const { checkAuthentication } = require('../middlewares/chekAuthentication')
const routerfProductos = Router()

const Products = require('../daos/productos/ProductosDaoMongoDB.js') // ProductosDaoArchivo '../services/productos.js'

const products = new Products()
const logger = require('../utils/winston')

// const checkAtuhentication = (req, res, next) => {
//     logger.info(req.isAuthenticated())
//     if (req.isAuthenticated()) return next();
//     res.redirect("/api/auth/login");
// }

routerfProductos.get('/', checkAuthentication, async (req, res) => {
    
    const productos = await products.getAllProducts()
    
    if(productos.error) res.status(200).json({msg: 'No hay productos cargados'}) 
    // res.render('index.ejs' , { username: req.session.user, visitas: req.session.visits })
    res.status(200).json(productos)
})

routerfProductos.get('/:id', checkAuthentication, async (req, res) => {  //checkAtuhentication,
    
    const id  = req.params.id
    const producto = await products.getById(id) //getProductById
    
    if(producto === {}) res.status(404).json({msg: 'Producto no encontrado'})

    res.status(200).json( { Mensaje : producto } )
})

routerfProductos.post('/', (req, res) => {
    const producto = products.createProduct(req.body) //addProduct
    res.status(201).json(producto)
})

routerfProductos.put('/:id', async (req, res) => {
    
    const producto = await products.updateProduct(req.params.id, req.body)
    res.status(200).json(producto)
})

// -------------------  Eliminar Producto  ------------------ 
routerfProductos.get('/delete/:id', checkAuthentication, async (req, res) => {
    
    const producto = await products.deleteProduct(req.params.id)
    
    if (producto === undefined || producto === null){
        if(producto === {}) res.status(404).json({msg: 'Producto no encontrado'})
    }
    res.status(200).json( { Mensaje_Producto_Eliminado : producto } )
})

module.exports = routerfProductos