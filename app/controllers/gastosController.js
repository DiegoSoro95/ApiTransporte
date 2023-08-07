var Gastos = require('../models/Gastos')
var db_con = require('../db')

module.exports = {
    listarGastos: function(req,res){
        //GET
        db_con.query(
          'CALL ListarGastos()', // Pasa los parámetros requeridos por el procedimiento almacenado
          (err, results) => {
            if (err) {
              return res.status(500).json({
                message: 'Error comuniquese con sistemas'
              })
            }
    
            if(results[0].length == 0) {
              return res.status(200).json( {
                message: 'No existen gastos'
              })
            }
            else{
              return res.status(200).json( {
                message: 'Existen gastos',
                listado: results[0],
              })
            }
          }
        );
    },
    exportarReporteGastos: function(req, res){
        const fechaInicio = req.query.fechaInicio;
        const fechaFin = req.query.fechaFin;

    //GET
    db_con.query(
        'CALL ExportarReporteGastos(?,?)', // Pasa los parámetros requeridos por el procedimiento almacenado
        [fechaInicio,fechaFin],
        (err, results) => {
        if (err) {
            return res.status(500).json({
            message: 'Error comuniquese con sistemas'
            })
        }

        if(results[0].length == 0) {
            return res.status(200).json( {
            message: 'No existen gastos para el periodo'
            })
        }
        else{
            return res.status(200).json( {
            message: 'Existen gastos para el periodo',
            listado: results[0],
            })
        }
        }
    );
    },
    iniciarRegistroGastos: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const idTransporte = req.body.idTransporte;
    const monto = req.body.monto;
    const observacion = req.body.observacion;

    let resultado ='';

    db_con.query(
        'CALL IniciarRegistroGasto(?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTransporte, monto, observacion], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                resultado = 'Gasto agregado con exito';
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