var Camiones = require('../models/Camiones')
var db_con = require('../db')

module.exports = {
    buscarCamion: function(req,res){
        const matricula = req.query.matricula;

        //GET
        db_con.query(
          'CALL BuscarCamion(?)', // Pasa los parámetros requeridos por el procedimiento almacenado
          [matricula],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                message: 'Error comuniquese con sistemas'
              })
            }
    
            if(results[0].length == 0) {
              return res.status(200).json( {
                message: 'No existe dicho camión'
              })
            }
            else{
              return res.status(200).json( {
                message: 'Existe dicho camión',
                listado: results[0],
              })
            }
          }
        );
    },
    listarCamion: function(req, res){

    //GET
    db_con.query(
        'CALL ListadoCamiones()', // Pasa los parámetros requeridos por el procedimiento almacenado
        (err, results) => {
        if (err) {
            return res.status(500).json({
            message: 'Error comuniquese con sistemas'
            })
        }

        if(results[0].length == 0) {
            return res.status(200).json( {
            message: 'No existen camiones'
            })
        }
        else{
            return res.status(200).json( {
            message: 'Existen camiones',
            listado: results[0],
            })
        }
        }
    );
    },
    listarCamionesEnReparacion: function(req, res){

    //GET
    db_con.query(
        'CALL ListadoCamionesEnReparacion()', // Pasa los parámetros requeridos por el procedimiento almacenado
        (err, results) => {
        if (err) {
            return res.status(500).json({
            message: 'Error comuniquese con sistemas'
            })
        }

        if(results[0].length == 0) {
            return res.status(200).json( {
            message: 'No existen camiones en reparación'
            })
        }
        else{
            return res.status(200).json( {
            message: 'Existen camiones en reparación',
            listado: results[0],
            })
        }
        }
    );
    },
    listarHistorialMantenimientoCamion: function(req, res){
    const matricula = req.query.matricula;

    //GET
    db_con.query(
        'CALL ListadoHistorialMantenimientoCamion(?)', // Pasa los parámetros requeridos por el procedimiento almacenado
        [matricula],
        (err, results) => {
        if (err) {
            return res.status(500).json({
            message: 'Error comuniquese con sistemas'
            })
        }

        if(results[0].length == 0) {
            return res.status(200).json( {
            message: 'No existe historial de mantenimiento'
            })
        }
        else{
            return res.status(200).json( {
            message: 'Existe historial de mantenimiento',
            listado: results[0],
            })
        }
        }
    );
    },
    listarCamionesDisponibles: function(req, res){
    
        //GET
        db_con.query(
            'CALL ListadoHistorialMantenimientoCamion()', // Pasa los parámetros requeridos por el procedimiento almacenado
            (err, results) => {
            if (err) {
                return res.status(500).json({
                message: 'Error comuniquese con sistemas'
                })
            }
    
            if(results[0].length == 0) {
                return res.status(200).json( {
                message: 'No existen camiones disponibles'
                })
            }
            else{
                return res.status(200).json( {
                message: 'Existen camiones disponibles',
                listado: results[0],
                })
            }
            }
        );
    },
    altaCamion: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const matricula = req.body.matricula;
    const anio = req.body.anio;
    const marca = req.body.marca;
    const kilometros = req.body.kilometros;
    const idEstado = req.body.idEstado;
    const idTipoCamion = req.body.idTipoCamion;
    let resultado ='';

    db_con.query(
        'CALL AltaCamion(?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [matricula, anio, marca, kilometros, idEstado,idTipoCamion], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                resultado = 'Alta realizada con éxito';
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
    modificarCamion: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const matricula = req.body.matricula;
    const anio = req.body.anio;
    const marca = req.body.marca;
    const kilometros = req.body.kilometros;
    const idEstado = req.body.idEstado;
    const idTipoCamion = req.body.idTipoCamion;
    let resultado ='';

    db_con.query(
        'CALL ModificarCamion(?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [matricula, anio, marca, kilometros,idEstado,idTipoCamion], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                resultado = 'Modificación realizada con éxito';
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
    eliminarCamion: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const matricula = req.body.matricula;
    let resultado ='';

    db_con.query(
        'CALL EliminarCamion(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [matricula], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                resultado = 'Baja realizada con éxito';
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