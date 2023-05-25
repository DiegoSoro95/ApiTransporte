var Empleados = require('../models/Empleados')
module.exports = {

buscar: function (req, res) {
  var q = req.query.q
  Empleados.find({ $text: { $buscar: q } }, function(err, empleados) {
    if(err) {
      return res.status(500).json({
        message: 'Error en la búsqueda'
      })
    }
    return res.json(empleados)
  })
},
list: function(req, res) {
    Empleados.find(function(err, empleados){
    if(err) {
      return res.status(500).json({
        message: 'Error obteniendo la empleados'
      })
    }
    return res.json(empleados)
  })
},
show: function(req, res) {
  var id = req.params.id
  Empleados.findOne({_id: id}, function(err, empleados){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al obtener la empleados'
      })
    }
    if(!empleados) {
      return res.status(404).json( {
        message: 'No tenemos esta empleados'
      })
    }
    return res.json(empleados)
  })
},
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