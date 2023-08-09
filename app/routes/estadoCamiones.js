var router = require('express').Router()
var estadoCamionesController = require ('../controllers/estadoCamionesController')
const auth = require('../auth');

  router.get('/buscarEstadoCamion', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    estadoCamionesController.buscarEstadoCamion(req, res)
  })
  router.get('/listadoEstadoCamion', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    estadoCamionesController.listadoEstadoCamion(req, res)
  })
  router.post('/altaEstadoCamion', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    estadoCamionesController.altaEstadoCamion(req, res)
  })
  router.post('/modificarEstadoCamion', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    estadoCamionesController.modificarEstadoCamion(req, res)
  })
  router.post('/eliminarEstadoCamion', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    estadoCamionesController.eliminarEstadoCamion(req, res)
  })
  module.exports = router
  /*
    listadoEstados(),cambiarEstado(idEstado):Es una modificacion,alta(),modificar(),eliminarEstado()
  */