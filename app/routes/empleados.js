var router = require('express').Router()
var empleadosController = require ('../controllers/empleadosController')
const auth = require('../auth');

  //http://localhost:4000/api/empleados/buscar?idUsuario=1
  router.get('/buscar', function(req, res) {
    empleadosController.buscar(req, res)
  })
  //http://localhost:4000/api/empleados/listar
  router.get('/listar', function(req, res) {
    empleadosController.list(req, res)
  })
  //http://localhost:4000/api/empleados/logueo?usuario=diego&contrasenia=diego123
  router.post('/logueo', function(req, res) {
    empleadosController.logueo(req, res)
  })
  router.post('/logueoChofer', function(req, res) {
    empleadosController.logueoChofer(req, res)
  })
  router.get('/buscarChofer', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.buscarChofer(req, res)
  })
  router.post('/altaChofer', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.altaChofer(req, res)
  })
  router.post('/modificarChofer', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.modificarChofer(req, res)
  })
  router.post('/bajaChofer', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.bajaChofer(req, res)
  })
  router.get('/listadoChoferesSinTransporteAsignado', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.listadoChoferesSinTransporteAsignado(req, res)
  })
  router.get('/listadoChofer', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.listadoChofer(req, res)
  })
  router.get('/listadoTecnico', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.listadoTecnico(req, res)
  })
  router.get('/buscarTecnico', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.buscarTecnico(req, res)
  })
  router.post('/altaTecnico', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.altaTecnico(req, res)
  })
  router.post('/modificarTecnico', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.modificarTecnico(req, res)
  })
  router.post('/bajaTecnico', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.bajaTecnico(req, res)
  })
  router.post('/ModificarContrasenia', function(req, res) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido' });
    }

    empleadosController.modificarContrasenia(req, res)
  })
  module.exports = router