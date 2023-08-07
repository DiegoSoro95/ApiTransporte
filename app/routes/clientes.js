var router = require('express').Router()
var clientesController = require ('../controllers/clientesController')

  router.get('/buscarCliente', function(req, res) {
    clientesController.buscarCliente(req, res)
  })
  router.get('/listarCliente', function(req, res) {
    clientesController.listarCliente(req, res)
  })
  router.post('/altaCliente', function(req, res) {
    clientesController.altaCliente(req, res)
  })
  router.post('/modificarCliente', function(req, res) {
    clientesController.modificarCliente(req, res)
  })
  router.post('/eliminarCliente', function(req, res) {
    clientesController.eliminarCliente(req, res)
  })
  module.exports = router