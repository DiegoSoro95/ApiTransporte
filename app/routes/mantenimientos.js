var router = require('express').Router()
var mantenimientoController = require ('../controllers/mantenimientoController')
const auth = require('../auth');

  router.post('/registroMantenimiento', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    mantenimientoController.registroMantenimiento(req, res)
  })
  module.exports = router
  /*
    registrarMantenimiento()
  */