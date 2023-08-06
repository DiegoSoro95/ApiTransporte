var router = require('express').Router()
var estadoCamionesController = require ('../controllers/estadoCamionesController')

  router.get('/buscarEstadoCamion', function(req, res) {
    estadoCamionesController.buscarEstadoCamion(req, res)
  })
  router.get('/listadoEstadoCamion', function(req, res) {
    estadoCamionesController.listadoEstadoCamion(req, res)
  })
  router.post('/altaEstadoCamion', function(req, res) {
    estadoCamionesController.altaEstadoCamion(req, res)
  })
  router.post('/modificarEstadoCamion', function(req, res) {
    estadoCamionesController.modificarEstadoCamion(req, res)
  })
  router.post('/eliminarEstadoCamion', function(req, res) {
    estadoCamionesController.eliminarEstadoCamion(req, res)
  })
  module.exports = router
  /*
    listadoEstados(),cambiarEstado(idEstado):Es una modificacion,alta(),modificar(),eliminarEstado()
  */