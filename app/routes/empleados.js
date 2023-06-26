var router = require('express').Router()
var empleadosController = require ('../controllers/empleadosController')

  //http://localhost:4000/api/empleados/buscar?idUsuario=1
  router.get('/buscar', function(req, res) {
    empleadosController.buscar(req, res)
  })
  //http://localhost:4000/api/empleados/listar
  router.get('/listar', function(req, res) {
    empleadosController.list(req, res)
  })
  //http://localhost:4000/api/empleados/logueo?usuario=diego&contrasenia=diego123
  router.get('/logueo', function(req, res) {
    empleadosController.logueo(req, res)
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