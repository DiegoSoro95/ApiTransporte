var router = require('express').Router()
var empleadosController = require ('../controllers/empleadosController')

router.get('/buscar', function(req, res) {
    empleadosController.buscar(req, res)
  })
  router.get('/listar', function(req, res) {
    empleadosController.list(req, res)
  })
  router.get('/:id', function(req, res) {
    empleadosController.show(req, res)
  })
  router.post('/', function(req, res) {
    empleadosController.create(req, res)
  })
  router.put('/:id', function(req, res) {
    empleadosController.update(req, res)
  })
  router.delete('/:id', function(req, res) {
    empleadosController.remove(req, res)
  })
  module.exports = router