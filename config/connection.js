const mongoose = require('mongoose')
const { options } = require('../config/config')
// const logger = require('morgan')

// -------- Conecta a la base de datos MONGO DB ----------

module.exports =  app => { //= async ()
    try {
        const URL = options.mongoDB.connection.URL //|| process.env.MONGO_URL_CONNECT_ECOM
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true            
        })
        .then(res => console.log("Connected to MongoDB Server <-1->")).catch(err => console.log(err))
        mongoose.Promise = global.Promise;
        process.on("SIGINT", cleanup);
        process.on("SIGTERM", cleanup);
        process.on("SIGHUP", cleanup);
        
        if (app) {
            app.set("mongoose", mongoose);
        }

        function cleanup() {
            mongoose.connection.close(function () {
                process.exit(0)
        })
    }
        //console.log("Connected to MongoDB Server <-2->")    
        // logger.info('Connected to MongoDB Server <-123->')
       
    } catch (error) {
       //logger.error('Error connection to DB: '+error)
       console.log('Error connection to DB: ',error)
    }
}    


// module.exports = { dbConnection }
