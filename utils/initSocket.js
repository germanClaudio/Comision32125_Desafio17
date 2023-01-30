const { options } = require("../options/config.js")
const logger = require('../utils/winston')

const ContainerMessages = require("../daos/mensajes/MensajesDaoMongoDB.js") //../contenedores/containerMessages.js
const containerMsg = new ContainerMessages(options.mongoDB.connection.URL) //options.filePath.pathMsg

const ContainerProducts = require("../daos/productos/ProductosDaoMongoDB.js")  //../daos/productos/ProductosDaoArchivo.js
const containerProduct = new ContainerProducts(options.mongoDB.connection.URL) //options.filePath.path

const { normalize, schema } = require("normalizr");

const initSocket = (io) => {
  io.on("connection", async (socket) => {
        logger.info("Nuevo cliente conectado!")
        
        // --------------------------  Products --------------------------------
        // --------------------------    All    --------------------------------  
        socket.emit('productsAll', await containerProduct.getCotizacionEnDolares() )  //getAllProducts() 
        
        socket.on("productsAll", async (arrProd) => {
            renderProduct(await arrProd)
        })

        socket.on('newProducto', async (producto) => {
            logger.info('Data servidor: ' + producto)
            await containerProduct.createProduct(producto)
            io.sockets.emit('productsAll', await containerProduct.getCotizacionEnDolares())
        })

        socket.on('deleteProducto', async (producto) => {
            await containerProduct.deleteProduct(producto)
            io.sockets.emit('productsAll', await containerProduct.getCotizacionEnDolares())
        })

        socket.on('updateProducto', async (producto) => {
            await containerProduct.updateProduct(producto)
            io.sockets.emit('productsAll', await containerProduct.getCotizacionEnDolares())
        })

        // -------------------------  Only One  -------------------------------
        
        socket.on('showOnlyOneProduct', async (oneProduct) => {
            console.log('onlyOneProduct   ', oneProduct)
            renderOnlyOneProduct (await oneProduct)
            })

        socket.on('showSearchProduct', async (product) => {
            console.log('producto socket: ', product )
            //logger.info('Data servidor showOneProducto: ', producto)
            io.sockets.emit('showOnlyOneProduct',
                            await containerProduct.getByNameOrCode(product))
        })

    // -----------------------------  Messages ---------------------------------
        // const normalizarMensajes = (mensajesConId) =>
        // normalize(mensajesConId, schemaMensajes)

        async function listarMensajesNormalizados() {
            const mensajes = await containerMsg.getAllMessages();
            //console.log('listarMensajesNormal: ',mensajes)
            // const normalizados = normalizarMensajes({ mensajes }); //id: "mensajes",
            
            return mensajes//normalizados;
            }

        // NORMALIZACIÓN DE MENSAJES
        // Definimos un esquema de autor
        const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" } );
        // Definimos un esquema de mensaje
        const schemaMensaje = new schema.Entity("post", { author: schemaAuthor }, { idAttribute: "id" });
        // Definimos un esquema de posts
        const schemaMensajes = new schema.Entity("posts", { mensajes: [schemaMensaje] }, { idAttribute: "id" });

        socket.emit("mensajesAll", await listarMensajesNormalizados()); //containerMsg.getAllMsg() )

        socket.on("newMensaje", async (message) => {
        message.fyh = new Date().toLocaleString()
        await containerMsg.createMessage(message) //mensajesApi.addMessage(mensaje)
        io.sockets.emit("mensajesAll", await listarMensajesNormalizados())
        })
    
        socket.on('disconnect', () => {
            logger.info(`User desconectado`)
        })
    })
}

module.exports = initSocket