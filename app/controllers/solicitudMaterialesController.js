var SolicitudMateriales = require('../models/SolicitudMateriales')
var db_con = require('../db')

module.exports = {
    listadoSolicitudMaterialesMantenimineto: function(req,res){
        const idMantenimiento = req.query.idMantenimiento;

        //GET
        db_con.query(
          'CALL ListadoSolicitudMaterialesMantenimineto(?)', // Pasa los parámetros requeridos por el procedimiento almacenado
          [idMantenimiento],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                message: 'Error comuniquese con sistemas'
              })
            }
    
            if(results[0].length == 0) {
              return res.status(200).json( {
                message: 'No existen solicitudes'
              })
            }
            else{
              return res.status(200).json( {
                message: 'Existen solicitudes',
                listado: results[0],
              })
            }
          }
        );
    },
    cambiarEstado: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const idSolicitud = req.body.idSolicitud;
    const estado = req.body.estado;

    let resultado ='';

    db_con.query(
        'CALL CambiarEstadoSolicitud(?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idSolicitud, estado], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                resultado = 'Cambio de estado realizado con exito';
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
    altaSolicitud: function(req, res){
        //POST
        // Llama al procedimiento almacenado
        const idMantenimiento = req.body.idMantenimiento;
        const producto = req.body.producto;
        const cantidad = req.body.cantidad;
    
        let resultado ='';
    
        db_con.query(
            'CALL AltaEstadoSolicitud(?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
            [idMantenimiento, producto, cantidad], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                    resultado = 'Alta de solicitud realizada con exito';
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