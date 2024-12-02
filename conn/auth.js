const { initializeApp, cert } = require("firebase-admin/app")
var { getAuth } = require("firebase-admin/auth")

var conta = require("./projetofirebase-cc4db-firebase-adminsdk-oqeae-70017d5bb8.json")

initializeApp({
    credential: cert(conta)
})

var auth = getAuth()

module.exports = auth
