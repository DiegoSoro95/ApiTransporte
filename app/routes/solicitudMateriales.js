var router = require('express').Router()
var solicitudMaterialesController = require ('../controllers/solicitudMaterialesController')
const auth = require('../auth');

  router.get('/listadoSolicitudMaterialesMantenimineto', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    solicitudMaterialesController.listadoSolicitudMaterialesMantenimineto(req, res)
  })
  router.post('/cambiarEstado', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    solicitudMaterialesController.cambiarEstado(req, res)
  })
  router.post('/altaSolicitud', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    solicitudMaterialesController.altaSolicitud(req, res)
  })
  module.exports = router