const { Router } = require('express')
// const { authMiddleware } = require('../middlewares/auth.middleware')
// const { checkAuthentication } = require('../middlewares/chekAuthentication')
const routerProductos = Router()

// const Products = require('../daos/productos/ProductosDaoMongoDB.js')
// const products = new Products()

const productsController = require('../controllers/products.controller')

// const logger = require('../utils/winston')

// const serverMongoDB = require('../usuarios/userMongoDB')  //  ../daos/usuarios/UsuariosDaoMongoDB.js
// const constructor = serverMongoDB.ServerMongoDB
// const server = new constructor()

//---------------- Get All Products -------------------------------
routerProductos.get('/', 
    productsController.getAllProducts
    // res.status(200).json({ msg: productos })
    // res.end()
)
    // return res.render('index', { userInfo: "pepe", visits: 1, products })
    //res.render('index.ejs')
// })

//---------------- Get Product by Id ------------------------------
routerProductos.get('/:id', productsController.getProductById)

//---------------- Create New Product -----------------------------
routerProductos.post('/', productsController.createProduct)

// --------------  Update a Product by Id -------------------------
routerProductos.post('/:id', productsController.updateProduct)

// --------------  Delete a Product by Id ------------------
routerProductos.delete('/:id', productsController.deleteProductById)

// --------------  Delete All Product -----------------------------
routerProductos.delete('/', productsController.deleteAllProducts)

module.exports = routerProductos


// routerProductos.get('/', checkAuthentication, async (req, res) => { 
    
//     const productos = await products.getAllProducts()
//     // const userInfo = await server.getUserByUsername(req.session.username)
//     const visits = req.session.visits

//     if(productos.error) res.status(200).json({msg: 'No hay productos cargados'}) 
//     // res.render('index.ejs' , { username: req.session.user, visitas: req.session.visits })
//     return res.render('index', { userInfo, visits })
//     //res.status(200).json(productos)
    
// })

// -------------------  Seleccionar Producto por Id ------------------ 
// routerfProductos.get('/:id', checkAuthentication, async (req, res) => {  //checkAtuhentication,
    
//     const userInfo = await server.getUserByUsername(req.session.username)

//     const id  = req.params.id
//     const producto = await products.getById(id)
    
//     if(producto === {}) res.status(404).json({msg: 'Producto no encontrado'})

//     try {
//         return res.render('productDetails', { producto, userInfo })
//     } catch (err) {
//         res.status(404).json({msg: 'Producto no encontrado'})
//     }
// })

// routerfProductos.post('/', (req, res) => {
//     const producto = products.createProduct(req.body)
//     res.status(201).json(producto)
// })

// -------------------  Actualizar Producto por Id ------------------ 
// routerfProductos.get('/update/:id', checkAuthentication, async (req, res) => {
    
//     const userInfo = await server.getUserByUsername(req.session.username)
//     const producto = await products.getById(req.params.id)
    
//     if(producto === {}) res.status(404).json({msg: 'Producto no encontrado'})

//     try {
//         return res.render('productDetails', { producto, userInfo })
        
//     } catch (err) {
//         res.status(404).json({msg: 'Producto no encontrado'})
//     }
// })

// -------------------  Eliminar Producto por Id ------------------ 
// routerfProductos.get('/delete/:id', checkAuthentication, async (req, res) => {
    
//     const visits = req.session.visits
//     const producto = await products.deleteProduct(req.params.id)
//     const userInfo = await server.getUserByUsername(req.session.username)

//     if (producto === undefined || producto === null){
//         if(producto === {}) res.status(404).json({msg: 'Producto no encontrado'})
//     }
//     return res.render('index', { producto, userInfo, visits })
//     // res.status(200).json( { Mensaje_Producto_Eliminado : producto } )
// })

// module.exports = routerProductos