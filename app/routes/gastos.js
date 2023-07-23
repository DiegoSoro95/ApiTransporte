var router = require('express').Router()
var gastosController = require ('../controllers/gastosController')

  //http://localhost:4000/api/gastos/buscar?idUsuario=1
  router.get('/buscar', function(req, res) {
    gastosController.buscar(req, res)
  })
  //http://localhost:4000/api/gastos/listar
  router.get('/listar', function(req, res) {
    gastosController.list(req, res)
  })
  //http://localhost:4000/api/gastos/logueo?usuario=diego&contrasenia=diego123
  router.post('/logueo', function(req, res) {
    gastosController.logueo(req, res)
  })
  router.post('/', function(req, res) {
    gastosController.create(req, res)
  })
  router.put('/:id', function(req, res) {
    gastosController.update(req, res)
  })
  router.delete('/:id', function(req, res) {
    gastosController.remove(req, res)
  })
  module.exports = router
  /*
    listarGastos(),iniciarRegistroGasto(idTransporte,entero),exportarReporteGastos(inicio,fin)
  */