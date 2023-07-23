var router = require('express').Router()
var camionesController = require ('../controllers/camionesController')

  //http://localhost:4000/api/camiones/buscar?idUsuario=1
  router.get('/buscar', function(req, res) {
    camionesController.buscar(req, res)
  })
  //http://localhost:4000/api/camiones/listar
  router.get('/listar', function(req, res) {
    camionesController.list(req, res)
  })
  //http://localhost:4000/api/camiones/logueo?usuario=diego&contrasenia=diego123
  router.post('/logueo', function(req, res) {
    camionesController.logueo(req, res)
  })
  router.post('/', function(req, res) {
    camionesController.create(req, res)
  })
  router.put('/:id', function(req, res) {
    camionesController.update(req, res)
  })
  router.delete('/:id', function(req, res) {
    camionesController.remove(req, res)
  })
  module.exports = router
  
  /*
  ListadoCamiones(),buscarCamion(matricula),
modificar(todos los datos),eliminar(idCamion),altaCamion(todos los datos),listarCamionesEnReparacion(),listarHistorilaMantenimientoCamion(matricula)
  */