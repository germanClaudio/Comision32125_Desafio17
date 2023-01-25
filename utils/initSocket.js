const { options } = require("../options/config.js")
const logger = require('../utils/winston')
const ContainerMessages = require("../contenedores/containerMessages.js")
const containerMsg = new ContainerMessages(options.filePath.pathMsg)

const ContainerProducts = require("../daos/productos/ProductosDaoMongoDB.js")  //../daos/productos/ProductosDaoArchivo.js
const containerProduct = new ContainerProducts(options.mongoDB.connection.URL) //options.filePath.path

const ContainerUsers = require("../daos/usuarios/UsuariosDaoMongoDB.js")
const containerUser = new ContainerUsers(options.mongoDB.connection.URL)

const { normalize, schema } = require("normalizr");

const initSocket = (io) => {
  io.on("connection", async (socket) => {
        logger.info("Nuevo cliente conectado!")
        
        // --------------------------  Products --------------------------------
        // --------------------------    All    --------------------------------  
        socket.emit('productsAll', await containerProduct.getAllProducts() )   
        
        socket.on("productsAll", async (arrProd) => {
            renderProduct(await arrProd)
        })

        socket.on('newProducto', async (producto) => {
            logger.info('Data servidor: ' + producto)
            await containerProduct.createProduct(producto)
            io.sockets.emit('productsAll', await containerProduct.getAllProducts())
        })

        // -------------------------  Only One  -------------------------------
        // socket.emit('showOnlyOneProduct', await containerProduct.getAllProducts() )

        socket.on("showOnlyOneProduct", async (arrProd) => {
            console.log('onlyOneProduct   ', arrProd)
            renderOnlyOneProduct(await arrProd)
            })

        socket.on('showOneProduct', async (producto) => {
            console.log('producto socket: ',producto)
            logger.info('Data servidor showOneProducto: ', producto)
            await containerProduct.getByNameOrCode(producto)
            io.sockets.emit('showOnlyOneProduct', await containerProduct.getAllProducts())
        })
        

    // -----------------------------  Messages ---------------------------------
        const normalizarMensajes = (mensajesConId) =>
        normalize(mensajesConId, schemaMensajes)

        async function listarMensajesNormalizados() {
            const mensajes = await containerMsg.getAllMsg();
            const normalizados = normalizarMensajes({ id: "mensajes", mensajes });
            return normalizados;
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
        await containerMsg.saveMsg(message) //mensajesApi.addMessage(mensaje)
        io.sockets.emit("mensajesAll", await listarMensajesNormalizados())
        })
    
        socket.on('disconnect', () => {
            logger.info(`User desconectado`)
        })

        // -----------------------------  Usuarios ---------------------------------
        
        // async function listarUsuario() {
        //     const usuario = await containerUser.getUserByUsername(username)
        //     console.log('usuario ', usuario)
        //     return usuario
        // }
                
        // socket.emit("showUserInfo", await listarUsuario(username));
    })
}

module.exports = initSocket