var router = require('express').Router()
var tipoCamionesController = require ('../controllers/tipoCamionesController')

  //http://localhost:4000/api/tipoCamiones/buscar?idUsuario=1
  router.get('/buscar', function(req, res) {
    tipoCamionesController.buscar(req, res)
  })
  //http://localhost:4000/api/tipoCamiones/listar
  router.get('/listar', function(req, res) {
    tipoCamionesController.list(req, res)
  })
  //http://localhost:4000/api/tipoCamiones/logueo?usuario=diego&contrasenia=diego123
  router.post('/logueo', function(req, res) {
    tipoCamionesController.logueo(req, res)
  })
  router.post('/', function(req, res) {
    tipoCamionesController.create(req, res)
  })
  router.put('/:id', function(req, res) {
    tipoCamionesController.update(req, res)
  })
  router.delete('/:id', function(req, res) {
    tipoCamionesController.remove(req, res)
  })
  module.exports = router
  /*
    listadoTipo(),buscarTipo(idTipo),alta(),baja(),modificar()
  */