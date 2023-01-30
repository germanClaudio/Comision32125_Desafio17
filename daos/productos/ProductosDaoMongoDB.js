const ContenedorMongoDB = require('../../contenedores/containerMongoDB.js')
const { options } = require('../../options/config.js')

const Productos = require('../../models/productos.models.js')
const logger = require('../../utils/winston.js')

const { ProductosDto } = require('../../dto/productosDto')
const { Cotizador } = require('../../utils/cotizador') 

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(options.mongoDB.connection.URL)
        this.cotizador = new Cotizador()
    }
    
    async getAllProducts(){
        try {
            const products = await Productos.find()
            logger.info('Productos encontrados... ProductosDaoMongoDB---->')
            return products
        } catch (error) {
            logger.error("Error MongoDB getProducts: ",error)
        }
    }

    async getById(id) {
        if(id){
            try {
                const product = await Productos.findById(`${id}`)
                logger.info('Producto encontrado: ',product)
                return product
            } catch (error) {
                logger.error("Error MongoDB getOneProducts: ",error)
            }
        } else {
            try {
                const products = await Productos.find()
                return products
            } catch (error) {
                logger.error("Error MongoDB getOneProducts: ",error)
            }
        }
    }

    //-------------------------Dto------------------------------------
    async getCotizacionEnDolares(id) {
        if(id){
            try {
                const product = await Productos.findById(`${id}`)
                const cotizaciones = {
                    ProcioDolar: this.cotizador
                    .getPrecioSegunMoneda(product.price, 'USD')
                }
                const productoDto = new ProductosDto(product, cotizaciones)
                
                return productoDto
            } catch (error) {
                logger.error("Error MongoDB getOneProducts: ",error)
            }
        } else {
            try {
                const products = await Productos.find()
                const productosDto = products.map(product => {
                    const cotizaciones = {
                        PrecioDolar: this.cotizador
                        .getPrecioSegunMoneda(product.price, 'USD')
                    }
                    const productoDto = new ProductosDto(product, cotizaciones)
                    return productoDto
                })
                return productosDto
            } catch (error) {
                logger.error("Error MongoDB getProducts: ",error)
            }
        }
    }

    //----------------------------------------------------------------

    async getByNameOrCode(product) {

        if(product === "No Product Selected") {
            console.log('Seleccione un producto por Nombre o Code: ',product)
            //logger.info('Producto NO encontrado: ', product)
            return product
        } else {
            try {
                const nameProduct = await Productos.findOne({ name: `${product}`}).exec();
                const codeProduct = await Productos.findOne({ code: `${product}`}).exec();
    
                if(nameProduct) {
                    console.log('Producto encontrado getByName: ', nameProduct)
                    //logger.info('Producto encontrado getByName')
                    return nameProduct
                } else if (codeProduct) {
                    console.log('Producto encontrado getByCode: ', codeProduct)
                    //logger.info('Producto encontrado getByCode')
                    return codeProduct
                } else {
                    return false
                }
            } catch (error) {
                logger.error("Error MongoDB getOneProduct: ",error)
            }

        }
        
    }

    async createProduct(product){
        try {
            // -------------- Validaciones producto ----------------------
            const itemMongoDB = await Productos.findOne({name: product.name})
            
            if (itemMongoDB) {
                logger.error("Producto con Nombre existente!! ")
                return itemMongoDB
                //return new Error('Ya se encuentra creado el item.')
            } else {
                const newProduct = new Productos(product)
                await newProduct.save()
                logger.info('Product created')
                return newProduct
            }

        } catch (error) {
            logger.error("Error MongoDB createProduct: ",error)
        }
    }

    async updateProduct(producto){

        try {
             const newValues = {
                name: producto.name,
                description: producto.description,
                price: producto.price,
                code: producto.code,
                picture: producto.picture,
                stock: producto.stock,
                timestamp: producto.timestamp
            }
            
            const productUpdated = await Productos.findOneAndUpdate(
                { _id: producto._id }, newValues , { new: true })

            logger.info('Producto actualizado ', productUpdated)
            
            return productUpdated
           
        } catch (error) {
            logger.error("Error MongoDB updateProduct: ",error)
        }
    }


    async deleteProduct(id) {
        try {
            const product = await Productos.findByIdAndRemove(`${id}`)
            console.log('Producto encontrado: ',product)
            return product
        } catch (error) {
            logger.error("Error MongoDB deleteProduct: ",error)
        }
    }


    async emptyCart(id){
        try {
            const productDeleted = await Productos.deleteOne({ "_id": `${id}` })  //{name: 'Peter'}
            logger.info('Producto eliminado: ' + JSON.stringify(productDeleted, null, 2))
            return productDeleted
        } catch (error) {
            logger.error("Error MongoDB deleteProduct: ",error)
        }
    }

    async desconectar() {
    }
}

module.exports = ProductosDaoMongoDB