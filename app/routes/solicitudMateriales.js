var router = require('express').Router()
var solicitudMaterialesController = require ('../controllers/solicitudMaterialesController')

  //http://localhost:4000/api/solicitudMateriales/buscar?idUsuario=1
  router.get('/buscar', function(req, res) {
    solicitudMaterialesController.buscar(req, res)
  })
  //http://localhost:4000/api/solicitudMateriales/listar
  router.get('/listar', function(req, res) {
    solicitudMaterialesController.list(req, res)
  })
  //http://localhost:4000/api/solicitudMateriales/logueo?usuario=diego&contrasenia=diego123
  router.post('/logueo', function(req, res) {
    solicitudMaterialesController.logueo(req, res)
  })
  router.post('/', function(req, res) {
    solicitudMaterialesController.create(req, res)
  })
  router.put('/:id', function(req, res) {
    solicitudMaterialesController.update(req, res)
  })
  router.delete('/:id', function(req, res) {
    solicitudMaterialesController.remove(req, res)
  })
  module.exports = router
  /*
    listadoSolicitudMaterialesMantenimineto(),cambiarEstado(estado),alta()
  */