const jsonwebtoken = require('jsonwebtoken')
const taskModel = require('./userModels').TaskModels

const SECRET_KEY = process.env.secret;
const viewSignup = (req, res) => {
    if (req.cookies) {
        let jwt = req.cookies.jwt;
        if (jwt && jwt != 'logout') {
            res.redirect('/view')
            return
        }
    }
    res.status(201).render('signup.pug')
}
const viewTasks = async (req, res) => {
    // console.log(req.cookies)
    let decoded = jsonwebtoken.verify(req.cookies.jwt, SECRET_KEY);
    if (!decoded) {
        res.json(201).json({
            status: "User not logged in"
        })
    }
    let result = await taskModel.find({ 'user': decoded.id })
    res.status(201).render('view.pug', {
        result
    })
}
const viewLogin = (req, res) => {
    if (req.cookies) {
        let jwt = req.cookies.jwt;
        if (jwt && jwt != 'logout') {
            res.redirect('/view')
            return
        }
    }
    res.status(201).render('login.pug')
}
const viewUpdate = async (req, res) => {
    try {
        if (req.query.id == undefined) {
            res.status(400).send("Invalid URL")
            return
        }
        let result = await taskModel.findById(req.query.id)
        // console.log(result)
        res.status(201).render('update.pug', {
            result
        })
    } catch (err) {
        res.status(400).send("Invalid URL")
    }
}
module.exports = { viewSignup, viewTasks, viewLogin, viewUpdate } 