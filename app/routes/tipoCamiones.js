var router = require('express').Router()
var tipoCamionesController = require ('../controllers/tipoCamionesController')

  router.get('/buscarTipoCamion', function(req, res) {
    tipoCamionesController.buscarTipoCamion(req, res)
  })
  router.get('/listadoTipoCamion', function(req, res) {
    tipoCamionesController.listadoTipoCamion(req, res)
  })
  router.post('/altaTipoCamion', function(req, res) {
    tipoCamionesController.altaTipoCamion(req, res)
  })
  router.post('/modificarTipoCamion', function(req, res) {
    tipoCamionesController.modificarTipoCamion(req, res)
  })
  router.post('/eliminarTipoCamion', function(req, res) {
    tipoCamionesController.eliminarTipoCamion(req, res)
  })
  module.exports = router
