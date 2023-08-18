var router = require('express').Router()
var camiones = require('./camiones')
var empleados = require('./empleados')
var clientes = require('./clientes')
var estadoCamiones = require('./estadoCamiones')
var gastos = require('./gastos')
var mantenimientos = require('./mantenimientos')
var solicitudMateriales = require('./solicitudMateriales')
var tipoCamiones = require('./tipoCamiones')
var transportes = require('./transportes')

router.use('/camiones', camiones)
router.use('/empleados', empleados)
router.use('/clientes', clientes)
router.use('/estadoCamiones', estadoCamiones)
router.use('/gastos', gastos)
router.use('/mantenimientos', mantenimientos)
router.use('/solicitudMateriales', solicitudMateriales)
router.use('/tipoCamiones', tipoCamiones)
router.use('/transportes', transportes)

router.get('/', function (req, res) {
res.status(200).json({ message: 'Estás conectado a nuestra API' })
})

module.exports = router