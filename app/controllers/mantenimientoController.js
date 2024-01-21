var Mantenimientos = require('../models/Mantenimientos')
var db_con = require('../db')

module.exports = {
    registroMantenimiento: function(req, res){
        //POST
        // Llama al procedimiento almacenado
        const fecha = req.body.fecha;
        const costo = req.body.costo;
        const observacion = req.body.observacion;
        const matricula = req.body.matricula;
        const idTecnico = req.body.idTecnico;   
        let resultado ='';
    
        db_con.query(
            'CALL RegistrarMantenimiento(?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
            [fecha, observacion, costo,matricula,idTecnico], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                    resultado = 'Registro de mantenimiento realizado con éxito';
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
    modificarMantenimiento: function(req, res){
        //POST
        // Llama al procedimiento almacenado
        const idMantenimiento = req.body.idMantenimiento;
        const fechaMantenimiento = req.body.fechaMantenimiento;
        const observaciones = req.body.observaciones;
        const estadoMantenimento = req.body.estadoMantenimento;
        const costo = req.body.costo;
        const matricula = req.body.matricula;
        const usuarioT = req.body.usuarioT;
        let resultado ='';
    
        db_con.query(
            'CALL ModificarMantenimiento(?,?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
            [idMantenimiento, fechaMantenimiento, observaciones, estadoMantenimento,costo,matricula,usuarioT], // Pasa los parámetros requeridos por el procedimiento almacenado
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
    eliminarMantenimiento: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const idMantenimiento = req.body.idMantenimiento;
    let resultado ='';

    db_con.query(
        'CALL EliminarMantenimiento(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idMantenimiento], // Pasa los parámetros requeridos por el procedimiento almacenado
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
    listarMantenimiento: function(req,res){
        //GET
        db_con.query(
          'CALL ListarMantenimiento()', // Pasa los parámetros requeridos por el procedimiento almacenado
          (err, results) => {
            if (err) {
              return res.status(500).json({
                message: 'Error comuniquese con sistemas'
              })
            }
    
            if(results[0].length == 0) {
              return res.status(200).json( {
                message: 'No existen mantenimientos'
              })
            }
            else{
              return res.status(200).json( {
                message: 'Existen mantenimientos',
                listado: results[0],
              })
            }
          }
        );
    },
}