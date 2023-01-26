// const { request } = require('express')

const checkAuthentication = (req, res, next) => {
    // console.log('req.isAuthenticated() ', req.isAuthenticated())
    if (req.isAuthenticated()) {
        return res.redirect("/api/auth/login");
    }
    next();
}

module.exports = { checkAuthentication }