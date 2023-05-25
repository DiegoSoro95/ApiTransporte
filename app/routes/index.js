var router = require('express').Router()
var empleados = require('./empleados')

router.use('/empleados', empleados)

router.get('/', function (req, res) {
res.status(200).json({ message: 'Estás conectado a nuestra API' })
})

module.exports = router