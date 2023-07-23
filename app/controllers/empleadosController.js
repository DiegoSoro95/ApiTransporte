var Empleados = require('../models/Empleados')

module.exports = {

buscar: function (req, res) {
  empleado = new Empleados();

  var idUsuario = req.query.idUsuario
  console.log(idUsuario);
  empleado.find('first',{ where: "usuario ='" + idUsuario+"'"}, function(err, empleados) {
    if(err) {
      return res.status(500).json({
        message: 'Error en la búsqueda'
      })
    }
    return res.json(empleados)
  })
},
list: function(req, res) {
    empleado = new Empleados();

    empleado.find('all',function(error, resultado){
    if(error) {
      return res.status(500).json({
        message: 'Error obteniendo la empleados'
      })
    }
    return res.json(resultado)
  })
},
logueo: function(req, res) {
  var usuario = req.body.usuario;
  var pass = req.body.contrasenia;

  empleado = new Empleados();

  empleado.query("CALL LoginTecnico ('"+usuario+"','"+pass+"')", function(err,result, empleados){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al obtener el empleado'
      })
    }

    if(result[0].length == 0) {
      empleado.query("CALL LoginAdministrador ('"+usuario+"','"+pass+"')", function(err2,result2, empleados2){
        if(err2) {
          return res.status(500).json({
            message: 'Se ha producido un error al obtener el empleado'
          })
        };

        if(result2[0].length == 0) {
          return res.status(200).json( {
            message: 'Datos ingresados incorrectos'
          })
        };

        return res.json(result2[0]);
      })
    } else {
    return res.json(result[0]);
  }
  })
},
//Hasta aqui va 
create: function(req, res) {
  var empleados = new Empleados (req.body)
  Empleados.save(function(err, empleados){
    if(err) {
      return res.status(500).json( {
        message: 'Error al guardar la empleados',
        error: err
      })
    }
    return res.status(201).json({
      message: 'saved',
      _id: empleados._id
    })
  })
},
update: function(req, res) {
  var id = req.params.id
  Empleados.findOne({_id: id}, function(err, empleados){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al guardar la empleados',
        error: err
      })
    }
    if(!empleados) {
      return res.status(404).json({
        message: 'No hemos encontrado la empleados'
      })
    }
    empleados.Usuario = req.body.usuario
    empleados.Contrasenia =  req.body.contrasenia
    empleados.NombreCompleto = req.body.nombreCompleto

    empleados.save(function(err, empleados){
      if(err) {
        return res.status(500).json({
          message: 'Error al guardar la empleados'
        })
      }
      if(!empleados) {
        return res.status(404).json({
          message: 'No hemos encontrado la empleados'
        })
      }
      return res.json(empleados)
    })
  })
},
remove: function(req, res) {
  var id = req.params.id
  Empleados.findByIdAndRemove(id, function(err, empleados){
    if(err) {
      return res.json(500, {
        message: 'No hemos encontrado la empleados'
      })
    }
    return res.json(empleados)
  })
}
}