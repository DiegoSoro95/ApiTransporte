var router = require('express').Router()
var mantenimientoController = require ('../controllers/mantenimientoController')

  router.post('/registroMantenimiento', function(req, res) {
    mantenimientoController.registroMantenimiento(req, res)
  })
  module.exports = router
  /*
    registrarMantenimiento()
  */