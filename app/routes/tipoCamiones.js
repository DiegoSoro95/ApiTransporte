var router = require('express').Router()
var tipoCamionesController = require ('../controllers/tipoCamionesController')
const auth = require('../auth');

  router.get('/buscarTipoCamion', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    tipoCamionesController.buscarTipoCamion(req, res)
  })
  router.get('/listadoTipoCamion', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    tipoCamionesController.listadoTipoCamion(req, res)
  })
  router.post('/altaTipoCamion', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    tipoCamionesController.altaTipoCamion(req, res)
  })
  router.post('/modificarTipoCamion', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    tipoCamionesController.modificarTipoCamion(req, res)
  })
  router.post('/eliminarTipoCamion', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    tipoCamionesController.eliminarTipoCamion(req, res)
  })
  module.exports = router
