var EstadoCamiones = require('../models/EstadoCamiones')
var db_con = require('../db')

module.exports = {
    buscarEstadoCamion: function(req,res){
        const idEstado = req.query.idEstado;

        //GET
        db_con.query(
          'CALL BuscarEstadoCamion(?)', // Pasa los parámetros requeridos por el procedimiento almacenado
          [idEstado],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                message: 'Error comuniquese con sistemas'
              })
            }
    
            if(results[0].length == 0) {
              return res.status(200).json( {
                message: 'No existe dicho Estado de camion'
              })
            }
            else{
              return res.status(200).json( {
                message: 'Existe dicho Estado de camion',
                listado: results[0],
              })
            }
          }
        );
    },
    listadoEstadoCamion: function(req, res){

    //GET
    db_con.query(
        'CALL ListadoEstadoCamion()', // Pasa los parámetros requeridos por el procedimiento almacenado
        (err, results) => {
        if (err) {
            return res.status(500).json({
            message: 'Error comuniquese con sistemas'
            })
        }

        if(results[0].length == 0) {
            return res.status(200).json( {
            message: 'No existen estados de camiones'
            })
        }
        else{
            return res.status(200).json( {
            message: 'Existen estados de camiones',
            listado: results[0],
            })
        }
        }
    );
    },
    altaEstadoCamion: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const idEstado = req.body.idEstado;
    const descripcion = req.body.descripcion;
    let resultado ='';

    db_con.query(
        'CALL AltaEstadoCamion(?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idEstado, descripcion], // Pasa los parámetros requeridos por el procedimiento almacenado
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
    modificarEstadoCamion: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const idEstado = req.body.idEstado;
    const descripcion = req.body.descripcion;
    let resultado ='';

    db_con.query(
        'CALL ModificarEstadoCamion(?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idEstado, descripcione], // Pasa los parámetros requeridos por el procedimiento almacenado
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
    eliminarEstadoCamion: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const idEstado = req.body.idEstado;
    let resultado ='';

    db_con.query(
        'CALL EliminarEstadoCamion(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idEstado], // Pasa los parámetros requeridos por el procedimiento almacenado
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
}