var router = require('express').Router()
var gastosController = require ('../controllers/gastosController')

  router.get('/listarGastos', function(req, res) {
    gastosController.listarGastos(req, res)
  })
  router.get('/exportarReporteGastos', function(req, res) {
    gastosController.exportarReporteGastos(req, res)
  })
  router.post('/iniciarRegistroGastos', function(req, res) {
    gastosController.iniciarRegistroGastos(req, res)
  })
  module.exports = router
  /*
    listarGastos(),iniciarRegistroGasto(idTransporte,entero),exportarReporteGastos(inicio,fin)
  */