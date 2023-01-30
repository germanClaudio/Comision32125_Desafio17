const { options } = require("../options/config.js")
//const logger = require('./winston')

const ContainerProducts = require("../daos/productos/ProductosDaoMongoDB.js")  //../daos/productos/ProductosDaoArchivo.js
const containerProduct = new ContainerProducts(options.mongoDB.navigation.URL) //options.filePath.path

const navigateSocket = (io) => {
  io.on("navigation", async (socket) => {
        // -------------------------  Only One  -------------------------------
        socket.on("showOnlyOneProduct", async (oneProduct) => {
            console.log('onlyOneProduct   ', oneProduct)
            renderOnlyOneProduct(await oneProduct)
            })

        socket.on('showSearchProduct', async (producto) => {
            console.log('producto socket: ',producto)
            //logger.info('Data servidor showOneProducto: ', producto)
            io.sockets.emit('showOnlyOneProduct', await containerProduct.getByNameOrCode(producto))  //containerProduct.getAllProducts())
        })
        
        // socket.on('disconnect', () => {
        //     logger.info(`User desconectado`)
        // })
    })
}

module.exports = navigateSocket