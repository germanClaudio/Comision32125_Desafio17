const ContainerMongoDB = require('../../contenedores/containerMongoDB.js')
const Mensajes = require('../../models/mensajes.models.js')
const logger = require('../../utils/winston.js')

const { options } = require('../../options/config.js')
//const connect = require('../../DB/configMongoDB.js')

class UsuariosDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super(options.mongoDB.connection.URL)  //connect.dbConnection()
    }
    
    async createMessage(mensaje){
        try {
            const newMessage = new Mensajes(usuario)
            await newMessage.save()
            logger.info('Message created: ' + newMessage)
        
        } catch (error) {
            logger.error(error)
        }
    }

    async getAllMessages(){
        try {
            const messages = await Mensajes.find()
            logger.info(messages)
            if(messages.length > 0){
                return messages
            }else{
                logger.info('No messages found')
            }
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = UsuariosDaoMongoDB 