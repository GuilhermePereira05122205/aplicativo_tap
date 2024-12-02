const { initializeApp, cert } = require("firebase-admin/app")
var { getFirestore } = require("firebase-admin/firestore")

var conta = require("./projetofirebase-cc4db-firebase-adminsdk-oqeae-70017d5bb8.json")

initializeApp({
    credential: cert(conta)
})

const db = getFirestore()

module.exports = db
