var router = require('express').Router()
var solicitudMaterialesController = require ('../controllers/solicitudMaterialesController')

  router.get('/listadoSolicitudMaterialesMantenimineto', function(req, res) {
    solicitudMaterialesController.listadoSolicitudMaterialesMantenimineto(req, res)
  })
  router.post('/cambiarEstado', function(req, res) {
    solicitudMaterialesController.cambiarEstado(req, res)
  })
  router.post('/altaSolicitud', function(req, res) {
    solicitudMaterialesController.altaSolicitud(req, res)
  })
  module.exports = router