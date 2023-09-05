var Clientes = require('../models/Clientes')
var db_con = require('../db')

module.exports = {
    buscarCliente: function(req,res){
        const documento = req.query.documento;

        //GET
        db_con.query(
          'CALL BuscarCliente(?)', // Pasa los parámetros requeridos por el procedimiento almacenado
          [documento],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                message: 'Error comuniquese con sistemas'
              })
            }
    
            if(results[0].length == 0) {
              return res.status(200).json( {
                message: 'No existe cliente'
              })
            }
            else{
              return res.status(200).json( {
                message: 'Existe cliente',
                listado: results[0],
              })
            }
          }
        );
    },
    listarCliente: function(req, res){

    //GET
    db_con.query(
        'CALL ListarCliente()', // Pasa los parámetros requeridos por el procedimiento almacenado
        (err, results) => {
        if (err) {
            return res.status(500).json({
            message: 'Error comuniquese con sistemas'
            })
        }

        if(results[0].length == 0) {
            return res.status(200).json( {
            message: 'No existen clientes'
            })
        }
        else{
            return res.status(200).json( {
            message: 'Existen clientes',
            listado: results[0],
            })
        }
        }
    );
    },
    altaCliente: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const documento = req.body.documento;
    const nombreCompleto = req.body.nombreCompleto;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    let resultado ='';

    db_con.query(
        'CALL AltaCliente(?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [documento, nombreCompleto, direccion, telefono], // Pasa los parámetros requeridos por el procedimiento almacenado
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
    modificarCliente: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const documento = req.body.documento;
    const nombreCompleto = req.body.nombreCompleto;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    let resultado ='';

    db_con.query(
        'CALL ModificarCliente(?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [documento, nombreCompleto, direccion, telefono], // Pasa los parámetros requeridos por el procedimiento almacenado
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
    eliminarCliente: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const documento = req.body.documento;
    let resultado ='';

    db_con.query(
        'CALL EliminarCliente(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [documento], // Pasa los parámetros requeridos por el procedimiento almacenado
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