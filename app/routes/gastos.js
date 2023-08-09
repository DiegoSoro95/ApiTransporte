var router = require('express').Router()
var gastosController = require ('../controllers/gastosController')
const auth = require('../auth');

  router.get('/listarGastos', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    gastosController.listarGastos(req, res)
  })
  router.get('/exportarReporteGastos', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    gastosController.exportarReporteGastos(req, res)
  })
  router.post('/iniciarRegistroGastos', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    gastosController.iniciarRegistroGastos(req, res)
  })
  module.exports = router
  /*
    listarGastos(),iniciarRegistroGasto(idTransporte,entero),exportarReporteGastos(inicio,fin)
  */