var router = require('express').Router()
var transportesController = require ('../controllers/transportesController')
const auth = require('../auth');

router.get('/buscarTransporte', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    transportesController.buscarTransporte(req, res);
})
router.post('/agregarFechaLlegada', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.agregarFechaLlegada(req, res)
})
router.get('/listadoTransportesAsignados', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.listadoTransportesAsignados(req, res)
})
router.get('/listarTransporteSinChofer', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    transportesController.listarTransporteSinChofer(req, res)
})
router.get('/listarTransportes', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    transportesController.listarTransportes(req, res)
})
router.post('/inicioTransporte', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.inicioTransporte(req, res)
})
router.post('/finalizarTransporte', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.finalizarTransporte(req, res)
})
router.get('/listadoTranporteTiempoReal', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.listadoTranporteTiempoReal(req, res)
})
router.get('/listadoTransporteSinChofer', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.listadoTransporteSinChofer(req, res)
})
router.post('/asignarTransporte', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.asignarTransporte(req, res)
})
router.post('/ubicacionReal', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.ubicacionReal(req, res)
})
router.get('/listadoTransportesNoRealizados', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.listadoTransportesNoRealizados(req, res)
})
router.post('/altaTransporteSinChofer', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.altaTransporteSinChofer(req, res)
})
router.post('/altaTransporteConChofer', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.altaTransporteConChofer(req, res)
})
router.post('/modificarTransporte', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.modificarTransporte(req, res)
})
router.post('/eliminarTransporte', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    transportesController.eliminarTransporte(req, res)
})
module.exports = router
