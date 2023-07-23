var router = require('express').Router()
var transportesController = require ('../controllers/transportesController')

//http://localhost:4000/api/transportes/buscar?idUsuario=1
router.get('/buscar', function(req, res) {
    transportesController.buscar(req, res)
})
//http://localhost:4000/api/transportes/listar
router.get('/listar', function(req, res) {
    transportesController.list(req, res)
})
//http://localhost:4000/api/transportes/logueo?usuario=diego&contrasenia=diego123
router.post('/logueo', function(req, res) {
    transportesController.logueo(req, res)
})
router.post('/', function(req, res) {
    transportesController.create(req, res)
})
router.put('/:id', function(req, res) {
    transportesController.update(req, res)
})
router.delete('/:id', function(req, res) {
    transportesController.remove(req, res)
})
module.exports = router
/*
buscarTransporte(idTransporte),agregarFechaLlegada(fechaFin):booleano, 
listarTrasportesChofer(idChofer), inicioTransporte(idTrasnporte),listadoTranporteTiempoReal(estado), 
listadoTransportesAsignados(UsuarioC),listadoTransporteSinChofer()
,asignarTransporte(idChofer,idCamion,idTransporte),listadoTransportesNoRealizados(),modificar(),eliminar(),alta()
*/