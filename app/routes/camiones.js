var router = require('express').Router()
var camionesController = require ('../controllers/camionesController')

  router.get('/buscarCamion', function(req, res) {
    camionesController.buscarCamion(req, res)
  })
  router.get('/listarCamion', function(req, res) {
    camionesController.listarCamion(req, res)
  })
  router.get('/listarCamionesEnReparacion', function(req, res) {
    camionesController.listarCamionesEnReparacion(req, res)
  })
  router.get('/listarHistorialMantenimientoCamion', function(req, res) {
    camionesController.listarHistorialMantenimientoCamion(req, res)
  })
  router.post('/altaCamion', function(req, res) {
    camionesController.altaCamion(req, res)
  })
  router.post('/modificarCamion', function(req, res) {
    camionesController.modificarCamion(req, res)
  })
  router.post('/eliminarCamion', function(req, res) {
    camionesController.eliminarCamion(req, res)
  })
  module.exports = router