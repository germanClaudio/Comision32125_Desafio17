const ContenedorMongoDB = require('../../contenedores/containerMongoDB.js')
const { options } = require('../../options/config.js')

const Productos = require('../../models/productos.models.js')
const logger = require('../../utils/winston.js')


class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(options.mongoDB.connection.URL)
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
        try {
            const product = await Productos.findById(`${id}`)
            logger.info('Producto encontrado: ',product)
            return product
        } catch (error) {
            logger.error("Error MongoDB getOneProducts: ",error)
        }
    }

    async getByNameOrCode(product) {
        try {
            const nameProduct = await Productos.findOne({ name: `${product}`}).exec();
            const codeProduct = await Productos.findOne({ code: `${product}`}).exec();

            if(nameProduct) {
                console.log('Producto encontrado getByName: ', nameProduct)
                //logger.info('Producto encontrado getByName')
                return nameProduct
            } else if(codeProduct) {
                console.log('Producto encontrado getByCode: ', codeProduct)
                //logger.info('Producto encontrado getByCode')
                return codeProduct
            } else {
                logger.info('Producto NO encontrado: ', product)
                return false
            }
        } catch (error) {
            logger.error("Error MongoDB getOneProduct: ",error)
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

    async updateProduct(id, dataBody, timestamp){
        try {
            const newValues = {
                 $set: dataBody,
                 timestamp: timestamp
            }
            const product = await Productos.updateOne({ _id: id}, newValues)
            logger.info('Producto actualizado ', product)
            return product
        } catch (error) {
            logger.error("Error MongoDB updateProduct: ",error)
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