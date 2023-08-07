var router = require('express').Router()
var transportesController = require ('../controllers/transportesController')

router.get('/buscarTransporte', function(req, res) {
    transportesController.buscarTransporte(req, res)
})
router.post('/agregarFechaLlegada', function(req, res) {
    transportesController.agregarFechaLlegada(req, res)
})
router.get('/listadoTransportesAsignados', function(req, res) {
    transportesController.listadoTransportesAsignados(req, res)
})
router.post('/inicioTransporte', function(req, res) {
    transportesController.inicioTransporte(req, res)
})
router.post('/finalizarTransporte', function(req, res) {
    transportesController.finalizarTransporte(req, res)
})
router.get('/listadoTranporteTiempoReal', function(req, res) {
    transportesController.listadoTranporteTiempoReal(req, res)
})
router.get('/listadoTransporteSinChofer', function(req, res) {
    transportesController.listadoTransporteSinChofer(req, res)
})
router.post('/asignarTransporte', function(req, res) {
    transportesController.asignarTransporte(req, res)
})
router.get('/listadoTransportesNoRealizados', function(req, res) {
    transportesController.listadoTransportesNoRealizados(req, res)
})
router.post('/altaTransporteSinChofer', function(req, res) {
    transportesController.altaTransporteSinChofer(req, res)
})
router.post('/altaTransporteConChofer', function(req, res) {
    transportesController.altaTransporteConChofer(req, res)
})
router.post('/modificarTransporte', function(req, res) {
    transportesController.modificarTransporte(req, res)
})
router.post('/eliminarTransporte', function(req, res) {
    transportesController.eliminarTransporte(req, res)
})
module.exports = router
