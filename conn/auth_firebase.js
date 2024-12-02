const { initializeApp } = require("firebase/app")
const {getAuth} = require("firebase/auth")


var firebase = {
    apiKey: "AIzaSyBQ9bpiB-NjxaQ3SIMGISlmVm4sc0sBSpE",
    authDomain: "projetofirebase-cc4db.firebaseapp.com",
    projectId: "projetofirebase-cc4db",
    storageBucket: "projetofirebase-cc4db.firebasestorage.app",
    messagingSenderId: "857804315274",
    appId: "1:857804315274:web:edfe3c7f15e59a33d32b73",
    measurementId: "G-4X6GX41CCW"
};

var app = initializeApp(firebase)

var auth = getAuth(app)

module.exports = auth