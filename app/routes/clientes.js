var router = require('express').Router()
var clientesController = require ('../controllers/clientesController')

  //http://localhost:4000/api/clientes/buscar?idUsuario=1
  router.get('/buscar', function(req, res) {
    clientesController.buscar(req, res)
  })
  //http://localhost:4000/api/clientes/listar
  router.get('/listar', function(req, res) {
    clientesController.list(req, res)
  })
  //http://localhost:4000/api/clientes/logueo?usuario=diego&contrasenia=diego123
  router.post('/logueo', function(req, res) {
    clientesController.logueo(req, res)
  })
  router.post('/', function(req, res) {
    clientesController.create(req, res)
  })
  router.put('/:id', function(req, res) {
    clientesController.update(req, res)
  })
  router.delete('/:id', function(req, res) {
    clientesController.remove(req, res)
  })
  module.exports = router
  /*
  listarClientes(), modificarCliente(todos los datos), eliminarCliente(idCliente), buscarCliente(documento),altaCliente(todos los datos)
  */