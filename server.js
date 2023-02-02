const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')

require('dotenv').config( {
    path: process.env.MODO === 'dev'
    ? path.resolve(__dirname, '.env')
    : path.resolve(__dirname, '.env')
})

const { Server: HttpServer } = require('http')
// const { Server: IOServer } = require('socket.io')

// ----------------  Routes ----------------------------------------------- //
const routerProducts = require('./routes/productos.routes.js')
// const routerUsers = require('./Routes/usuarios.route.js')
// const initSocket = require('./utils/initSocket.js')
// const { infoRouter } = require('./Routes/info.routes.js')
// const { authRouter } = require('./Routes/auth.routes.js')

//______________________________ mongo para session ______________________________ //
const MongoStore = require('connect-mongo')
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//const connect = require('./config/connection')


//________________________________________________________________________________ //
//const passport = require('passport')
// const { initPassport } = require('./middlewares/passport.js')
//________________________________________________________________________________ //

// const parseArgs = require('minimist')
// const args = parseArgs(process.argv.slice(2))
//     console.log('args: ', args)

const initServer = () => {    
    
    const app = express()
    const httpServer = new HttpServer(app)
    // const io = new IOServer(httpServer)
    require("./config/connection.js")(app)

    // app.use(bodyParser.urlencoded({
    //     extended: true
    //   }))

    /////////////////////// configuracion de EJS /////////////////////////
    app.set('view engine', 'ejs')
    app.set('views', __dirname + '/public/views/pages') 

    //////////////  middleware  ///////////////////////
    // app.use(session({
    //     secret: process.env.SECRET_KEY_COOKIE,
    //     cookie: {
    //         httpOnly: false,
    //         secure: false,
    //         maxAge: 1000 * 60 * 60 * 24
    //     },
    //     rolling: true,
    //     resave: true,
    //     saveUninitialized: false
    // }))

    app.use(session({
        secret: process.env.SECRET_KEY_SESSION,    
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL_CONNECT,
            mongoOptions: advancedOptions,
        }),
        httpOnly: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 1,
        },
        resave: true, 
        saveUninitialized: true
    }))

    // initPassport()
    // app.use(passport.initialize())
    // app.use(passport.session())

    app.use(express.static('public'))
    app.use(express.static('src/images'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use(logger('dev'))
        
    ////////////////////// Rutas //////////////////////////////    
    app.use('/api/productos', routerProducts)
    // app.use('/api/auth', authRouter)
    // app.use('/', infoRouter)
    // app.use('/getUsers', routerUsers)
    ////////////////////////////////////////////////////////

//_____________________________________________ socket.io _____________________________________ //   
    // initSocket(io)
//______________________________________________________________________________________________//

    return {
        listen: port => new Promise((res, rej)=>{
            const server = httpServer.listen(port, () => {
                res(server)
            })
            server.on('error', err => rej(err))
        })
    }
}

module.exports = initServer