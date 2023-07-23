var router = require('express').Router()
var estadoCamionesController = require ('../controllers/estadoCamionesController')

  //http://localhost:4000/api/estadoCamiones/buscar?idUsuario=1
  router.get('/buscar', function(req, res) {
    estadoCamionesController.buscar(req, res)
  })
  //http://localhost:4000/api/estadoCamiones/listar
  router.get('/listar', function(req, res) {
    estadoCamionesController.list(req, res)
  })
  //http://localhost:4000/api/estadoCamiones/logueo?usuario=diego&contrasenia=diego123
  router.post('/logueo', function(req, res) {
    estadoCamionesController.logueo(req, res)
  })
  router.post('/', function(req, res) {
    estadoCamionesController.create(req, res)
  })
  router.put('/:id', function(req, res) {
    estadoCamionesController.update(req, res)
  })
  router.delete('/:id', function(req, res) {
    estadoCamionesController.remove(req, res)
  })
  module.exports = router
  /*
    listadoEstados(),cambiarEstado(idEstado):Es una modificacion,alta(),modificar(),eliminarEstado()
  */