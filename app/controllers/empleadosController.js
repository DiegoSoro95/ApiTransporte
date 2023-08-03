var Empleados = require('../models/Empleados')
var db_con = require('../db')

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
  logueoChofer: function(req, res) {
    var usuario = req.body.usuario;
    var pass = req.body.contrasenia;

    empleado = new Empleados();
    
    empleado.query("CALL LoginChofer ('"+usuario+"','"+pass+"')", function(err,result, empleados){
      if(err) {
        return res.status(500).json({
          message: 'Se ha producido un error al obtener el empleado'
        })
      }

      if(result[0].length == 0) {
        return res.status(200).json( {
          message: 'Datos ingresados incorrectos'
        })
      } 
      else {
        return res.json(result[0]);
      }
    })
  },
  //CONEXIONES DE CHOFER
  buscarChofer: function(req, res) {
    empleado = new Empleados();

    var idUsuario = req.query.idUsuario;

    empleado.query("CALL BuscarChofer ('"+idUsuario+"')", function(err,result, empleados){
      if(err) {
        return res.status(500).json({
          message: 'Se ha producido un error al obtener el empleado'
        })
      }

      if(result[0].length == 0) {
        return res.status(200).json( {
          message: 'No se encontraron datos del chofer'
        })
      } 
      else {
        return res.json(result[0]);
      }
    })
  },
  altaChofer: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const usuario = req.body.usuario;
    const pass = req.body.contrasenia;
    const nombre = req.body.nombre;
    const licencia = req.body.licencia;
    const telefono = req.body.telefono;
    let resultado ='';

    db_con.query(
      'CALL AltaChofer(?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
      [usuario, pass, nombre, licencia, telefono], // Pasa los parámetros requeridos por el procedimiento almacenado
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Error comuniquese con sistemas'
          })
        }

        // Obtener el valor del parámetro de salida
        db_con.query('SELECT @resultado AS resultado', (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          } else {
            resultado = results[0].resultado;

            if (resultado == null){
              resultado = 'Alta realizada con exito';
            }
            // Cierra la conexión
            return res.status(200).json( {
              message: resultado
            })
          }  
        });
      }
    );

  },
  modificarChofer: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const usuario = req.body.usuario;
    const nombre = req.body.nombre;
    const licencia = req.body.licencia;
    const telefono = req.body.telefono;
    let resultado ='';

    db_con.query(
      'CALL ModificarChofer(?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
      [usuario, nombre, licencia, telefono], // Pasa los parámetros requeridos por el procedimiento almacenado
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Error comuniquese con sistemas'
          })
        }

        // Obtener el valor del parámetro de salida
        db_con.query('SELECT @resultado AS resultado', (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          } else {
            resultado = results[0].resultado;

            if (resultado == null){
              resultado = 'Modificacion realizada con exito';
            }
            // Cierra la conexión
            return res.status(200).json( {
              message: resultado
            })
          }  
        });
      }
    );
  },
  bajaChofer: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const usuario = req.body.usuario;
    let resultado ='';

    db_con.query(
      'CALL EliminarChofer(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
      [usuario], // Pasa los parámetros requeridos por el procedimiento almacenado
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Error comuniquese con sistemas'
          })
        }

        // Obtener el valor del parámetro de salida
        db_con.query('SELECT @resultado AS resultado', (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          } else {
            resultado = results[0].resultado;

            if (resultado == null){
              resultado = 'Baja realizada con exito';
            }
            // Cierra la conexión
            return res.status(200).json( {
              message: resultado
            })
          }  
        });
      }
    );
  },
  listadoChoferesSinTransporteAsignado: function(req,res){
    //GET
    db_con.query(
      'CALL ListadoChoferSinTransporteAsignado()', // Pasa los parámetros requeridos por el procedimiento almacenado
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Error comuniquese con sistemas'
          })
        }

        if(results[0].length == 0) {
          return res.status(200).json( {
            message: 'No hay choferes sin transporte asignado'
          })
        }
        else{
          return res.status(200).json( {
            message: 'Hay choferes sin transporte asignado',
            listado: results[0],
          })
        }
      }
    );
  },
  listadoChofer: function(req,res){
    //GET
    db_con.query(
      'CALL ListadoChofer()', // Pasa los parámetros requeridos por el procedimiento almacenado
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Error comuniquese con sistemas'
          })
        }

        if(results[0].length == 0) {
          return res.status(200).json( {
            message: 'No existen choferes en el sistema'
          })
        }
        else{
          return res.status(200).json( {
            message: 'Hay choferes en el sistema',
            listado: results[0],
          })
        }
      }
    );
  },
  buscarTecnico: function(req,res){
    empleado = new Empleados();

    var idUsuario = req.query.idUsuario;

    empleado.query("CALL BuscarTecnico ('"+idUsuario+"')", function(err,result, empleados){
      if(err) {
        return res.status(500).json({
          message: 'Se ha producido un error al obtener el empleado'
        })
      }

      if(result[0].length == 0) {
        return res.status(200).json( {
          message: 'No se encontraron datos del tecnico'
        })
      } 
      else {
        return res.json(result[0]);
      }
    })
  },
  altaTecnico: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const usuario = req.body.usuario;
    const pass = req.body.contrasenia;
    const nombre = req.body.nombre;
    const especializacion = req.body.especializacion;
    let resultado ='';

    db_con.query(
      'CALL AltaTecnico(?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
      [usuario, pass, nombre, especializacion], // Pasa los parámetros requeridos por el procedimiento almacenado
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Error comuniquese con sistemas'
          })
        }

        // Obtener el valor del parámetro de salida
        db_con.query('SELECT @resultado AS resultado', (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          } else {
            resultado = results[0].resultado;

            if (resultado == null){
              resultado = 'Alta realizada con exito';
            }
            // Cierra la conexión
            return res.status(200).json( {
              message: resultado
            })
          }  
        });
      }
    );
  },
  modificarTecnico: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const usuario = req.body.usuario;
    const nombre = req.body.nombre;
    const especializacion = req.body.especializacion;
    let resultado ='';

    db_con.query(
      'CALL ModificarTecnico(?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
      [usuario, nombre, especializacion], // Pasa los parámetros requeridos por el procedimiento almacenado
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Error comuniquese con sistemas'
          })
        }

        // Obtener el valor del parámetro de salida
        db_con.query('SELECT @resultado AS resultado', (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          } else {
            resultado = results[0].resultado;

            if (resultado == null){
              resultado = 'Modificacion realizada con exito';
            }
            // Cierra la conexión
            return res.status(200).json( {
              message: resultado
            })
          }  
        });
      }
    );
  },
  bajaTecnico: function(req, res){
    //POST
    const usuario = req.body.usuario;
    let resultado ='';

    db_con.query(
      'CALL EliminarTecnico(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
      [usuario], // Pasa los parámetros requeridos por el procedimiento almacenado
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Error comuniquese con sistemas'
          })
        }

        // Obtener el valor del parámetro de salida
        db_con.query('SELECT @resultado AS resultado', (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          } else {
            resultado = results[0].resultado;

            if (resultado == null){
              resultado = 'Baja realizada con exito';
            }
            // Cierra la conexión
            return res.status(200).json( {
              message: resultado
            })
          }  
        });
      }
    );
  },
  modificarContraseña: function(req, res){
    //POST
    const usuario = req.body.usuario;
    let resultado ='';

    db_con.query(
      'CALL ModificarContraseña(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
      [usuario], // Pasa los parámetros requeridos por el procedimiento almacenado
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Error comuniquese con sistemas'
          })
        }

        // Obtener el valor del parámetro de salida
        db_con.query('SELECT @resultado AS resultado', (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          } else {
            resultado = results[0].resultado;

            if (resultado == null){
              resultado = 'Contraseña cambiada con exito';
            }
            // Cierra la conexión
            return res.status(200).json( {
              message: resultado
            })
          }  
        });
      }
    );
  },

}