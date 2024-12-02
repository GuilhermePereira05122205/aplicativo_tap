var express = require('express');
var router = express.Router();
var db = require("../conn/conn")
var auth = require("../auth/auth")

router.get("/", auth, function(req, res, next){
  res.redirect("/listar")
})

/* GET home page. */
router.post('/reuniao', auth, function (req, res, next) {

  db.collection("reuniao").add({
    titulo: req.body.titulo,
    assunto: req.body.assunto,
    descricao: req.body.descricao,
    data: req.body.data,
    local: req.body.local,
    userId: req.session.user.id
  }).then(() => {
    res.redirect("/reuniao/listar")
  }).catch((e) => {
    res.render("error")
  })

});


router.get("/reuniao/cadastrar", auth, function (req, res, next) {
  res.render("cadastrar")
})

router.get("/reuniao/listar", auth, function (req, res, next) {
  db.collection("reuniao").where("userId", "==", req.session.user.id).get().then((reuniao) => {

    reuniao.docs.map((data) => data.data = data.data())

    res.render("listar", {
      reunioes: reuniao.docs
    })
  })

})

router.get("/reuniao/atualizar/:id", auth, function (req, res, next) {
  db.collection("reuniao").doc(req.params.id).get().then((reuniao) => {
    if (reuniao.data().userId == req.session.user.id) {

      var data = {
        id: reuniao.id
      }

      data.titulo = reuniao.data().titulo
      data.assunto = reuniao.data().assunto
      data.descricao = reuniao.data().descricao
      data.local = reuniao.data().local
      data.data = reuniao.data().data

      res.render("atualizar", {
        reuniao: data
      })
    }else{
      res.status(401).send({
        msg: "Erro ao listar reuniao"
      })
    }
  })
})

router.post("/reuniao/atualizar/:id", auth, function (req, res, next) {
  db.collection("reuniao").doc(req.params.id).get().then((reuniao) => {
    if (reuniao.exists && reuniao.data().userId == req.session.user.id) {
      db.collection("reuniao").doc(req.params.id).update({
        titulo: req.body.titulo,
        assunto: req.body.assunto,
        descricao: req.body.descricao,
        data: req.body.data,
        local: req.body.local
      }).then(() => {
        res.redirect("/reuniao/listar")
      })
    } else {
      res.render("error", {
        message: "Usuario nao autorizado"
      })
    }

  }).catch((e) => {
    res.render("error")
  })
})

router.get("/reuniao/excluir/:id", auth, function (req, res, next) {
  db.collection("reuniao").doc(req.params.id).get().then((reuniao) => {
    if (reuniao.exists && reuniao.data().userId == req.session.user.id) {
      db.collection("reuniao").doc(req.params.id).delete().then(() => {
        res.redirect("/reuniao/listar")
      })
    } else {
      res.render("error", {
        message: "Erro ao excluir reuniao"
      })
    }
  })
})

module.exports = router;
