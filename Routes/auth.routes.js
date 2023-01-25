const { Router } = require('express')
const passport = require('passport')
const { countVisits } = require('../middlewares/countVisits/countVisits.middleware')
const { checkAuthentication } = require('../middlewares/chekAuthentication')
// const { users } = require('../usuarios/users')
//const { passport } = require('../middlewares/passport')
const { generateToken } = require('../utils/generateToken')
const logger = require('../utils/winston')

const authRouter = Router()

const serverMongoDB = require('../usuarios/userMongoDB')  //  ../daos/usuarios/UsuariosDaoMongoDB.js
const constructor = serverMongoDB.ServerMongoDB
const server = new constructor() //serverMongoDB.serverMongoDB

const bCrypt = require('bcrypt');

//_______________________________ login _____________________________________ //
authRouter.get('/login', (req, res) => { // lleva la vista del formulario de login
    const flag = false
    const fail = false
    res.render('login', { flag, fail })
})

// authRouter.post('/login', passport.authenticate('login', {
//     successRedirect: '/api/productos',
//     failureRedirect: '/api/auth/login',
// }))

authRouter.post('/login', countVisits ,async (req, res) => {

    try {
        const { username } = req.body
        let { password } = req.body
        let visits = req.session.visits
        const flag = true

        const user = await server.getUserByUsername(username)
        
        function isValidPassword(user, password) {
            const bCrypto =  bCrypt.compareSync(password, user.password)
            return bCrypto
           }

        const boolean = isValidPassword(user, password)

        console.log('boolean: ' + boolean)

        if (boolean) {
            const usuario = await server.getUserByUsernameAndPass(username, user.password)
            const userInfo = await server.getUserByUsername(username)

            console.log('error usuario: no encuentra usuario en Mongo', usuario)

            if (!usuario) {
                return res.render('register', { flag }) // return res.json({ error: 'Usuario no existe!!' });
            } else {
                const access_token = generateToken(usuario)
                req.session.admin = true
                logger.info('usuario loggeado!')
                return res.render('index', { userInfo, username, visits, flag } )
            }
        } else {
            const flag = false
            const fail = true
            return res.render('login', { flag, fail } )
        }

    } catch (error) {
        const flag = false
        const fail = true
        return res.render('login', { flag, fail } )
        // res.status(500).send(error)
    }
})

//----------------------------------------------------------------
authRouter.get('/historial', checkAuthentication, async (req, res) => {
    
    // const userInfo = await server.getUserByUsername(username)
    try {
        return res.render('historial')//{{userInfo: req.user.username  })
    } catch (error) {
        res.status(500).send(error)
    }
})

authRouter.get('/index', checkAuthentication, countVisits, async (req, res) => {
    // const userInfo = await server.getUserByUsername(username)
    let visits = req.session.visits
    const userInfo = req.session.username
    try {
        logger.info('usuario session: ', req.session.username)
        return res.render('index')//, { userInfo, visits }) // , { userInfo, username: req.session.user, visitas: req.session.visits })
    } catch (error) {
        res.status(500).send(error)
    }
})


//_________________________________ github _____________________________________ //

authRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}))

authRouter.get('/githubcallback', passport.authenticate('github', { 
//     successRedirect: '/api/productos',
//     failureRedirect: '/api/auth/login'
// })),
        failureRedirect: '/api/auth/login'
        }), (req, res) => {
            const username = req.user.username
            if (username != null) {
                res.render('index', { username } )
            }
            if (username == null) {
                res.redirect('/api/login');
            }
        });

//____________________________________________ register _____________________________________ //

authRouter.get('/register', (req, res) => {   // devuelve la vista de registro
    const flag = false
    res.render('register', { flag })
})
    // authRouter.post('/register', passport.authenticate('signup', {
    //     successRedirect: '/api/auth/login',
    //     failureRedirect: '/api/auth/register',
    // }))

authRouter.post('/register', (req, res) => { // registra un usuario
    const { name, lastName, email, username, admin } = req.body
    let { password } = req.body

    function createHash(password) {
        return bCrypt.hashSync(
                  password,
                  bCrypt.genSaltSync(10),
                  null);
      }
    
    password = createHash(password)

    const yaExiste = server.getUserByUsername(username) 

    if (yaExiste === [] ) {
        return res.render('register', { username , flag: true })
    } else {
        const nuevoUsuario = { 
            name,
            lastName,
            email,
            username,
            password,
            admin,         
        }
        
        //------------------------------
        server.createUser(nuevoUsuario)
        //------------------------------
        const access_token = generateToken({
            username,        
            admin,         
            // direccion 
        })
        res.render('login', { username: nuevoUsuario.username, flag: true })
        //res.json( { Success: 'Registro Exitoso con JWT: ', access_token })
    }
})

//____________________________ logout __________________________________ //

authRouter.get('/logout', (req, res) => { // cierra la sesion
    
    req.session.destroy(err => {
        // if(err) return res.send(err)
        try {
            return res.render('logout')
        } catch(err) {
            return res.json(err)
        }
    })
})

module.exports = { 
    authRouter 
}