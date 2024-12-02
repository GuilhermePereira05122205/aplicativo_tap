var express = require('express');
var router = express.Router();
var db = require("../conn/auth_firebase")
var {signInWithEmailAndPassword, createUserWithEmailAndPassword} = require("firebase/auth")

router.get("/register", function(req, res, next){
    res.render("CadastroLogin")
})

router.post("/register", function(req, res, next){
    createUserWithEmailAndPassword(db, req.body.email, req.body.password).then((user) => {
        res.redirect("/login")
    }).catch((e) => {
        res.redirect("/register")
    })
})

router.get("/login", function(req, res, next){
    res.render("login")
})

router.post("/login", function(req, res, next){
    signInWithEmailAndPassword(db, req.body.email, req.body.password).then((user) => {
        req.session.user = {
            id: user.user.uid,
            email: user.user.email,
        }

        res.redirect("/reuniao/listar")
    }).catch((e) => {
        res.redirect("/login")
    })
})

module.exports = router