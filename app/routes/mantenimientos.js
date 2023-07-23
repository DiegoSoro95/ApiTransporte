var router = require('express').Router()
var mantenimientoController = require ('../controllers/mantenimientoController')

  //http://localhost:4000/api/mantenimiento/buscar?idUsuario=1
  router.get('/buscar', function(req, res) {
    mantenimientoController.buscar(req, res)
  })
  //http://localhost:4000/api/mantenimiento/listar
  router.get('/listar', function(req, res) {
    mantenimientoController.list(req, res)
  })
  //http://localhost:4000/api/mantenimiento/logueo?usuario=diego&contrasenia=diego123
  router.post('/logueo', function(req, res) {
    mantenimientoController.logueo(req, res)
  })
  router.post('/', function(req, res) {
    mantenimientoController.create(req, res)
  })
  router.put('/:id', function(req, res) {
    mantenimientoController.update(req, res)
  })
  router.delete('/:id', function(req, res) {
    mantenimientoController.remove(req, res)
  })
  module.exports = router
  /*
    registrarMantenimiento()
  */