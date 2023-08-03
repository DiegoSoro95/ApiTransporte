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
  router.post('/logueo', function(req, res) {
    empleadosController.logueo(req, res)
  })
  router.post('/logueoChofer', function(req, res) {
    empleadosController.logueoChofer(req, res)
  })
  router.get('/buscarChofer', function(req, res) {
    empleadosController.buscarChofer(req, res)
  })
  router.post('/altaChofer', function(req, res) {
    empleadosController.altaChofer(req, res)
  })
  router.post('/modificarChofer', function(req, res) {
    empleadosController.modificarChofer(req, res)
  })
  router.post('/bajaChofer', function(req, res) {
    empleadosController.bajaChofer(req, res)
  })
  router.get('/listadoChoferesSinTransporteAsignado', function(req, res) {
    empleadosController.listadoChoferesSinTransporteAsignado(req, res)
  })
  router.get('/listadoChofer', function(req, res) {
    empleadosController.listadoChofer(req, res)
  })
  router.get('/buscarTecnico', function(req, res) {
    empleadosController.buscarTecnico(req, res)
  })
  router.post('/altaTecnico', function(req, res) {
    empleadosController.altaTecnico(req, res)
  })
  router.post('/modificarTecnico', function(req, res) {
    empleadosController.modificarTecnico(req, res)
  })
  router.post('/bajaTecnico', function(req, res) {
    empleadosController.bajaTecnico(req, res)
  })
  router.post('/ModificarContrasenia', function(req, res) {
    empleadosController.modificarContrasenia(req, res)
  })
  module.exports = router