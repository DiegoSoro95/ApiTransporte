var TipoCamiones = require('../models/TipoCamiones')
var db_con = require('../db')

module.exports = {
    buscarTipoCamion: function(req,res){
        const idTipo = req.query.idTipo;

        //GET
        db_con.query(
          'CALL BuscarTipoCamion(?)', // Pasa los parámetros requeridos por el procedimiento almacenado
          [idTipo],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                message: 'Error comuniquese con sistemas'
              })
            }
    
            if(results[0].length == 0) {
              return res.status(200).json( {
                message: 'No existe dicho tipo de camion'
              })
            }
            else{
              return res.status(200).json( {
                message: 'Existe dicho tipo de camion',
                listado: results[0],
              })
            }
          }
        );
    },
    listarTipoCamion: function(req, res){

    //GET
    db_con.query(
        'CALL ListadoTipoCamion()', // Pasa los parámetros requeridos por el procedimiento almacenado
        (err, results) => {
        if (err) {
            return res.status(500).json({
            message: 'Error comuniquese con sistemas'
            })
        }

        if(results[0].length == 0) {
            return res.status(200).json( {
            message: 'No existen tipos de camiones'
            })
        }
        else{
            return res.status(200).json( {
            message: 'Existen tipos de camiones',
            listado: results[0],
            })
        }
        }
    );
    },
    altaTipoCamion: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const idTipo = req.body.idTipo;
    const descripcion = req.body.descripcion;
    const dimensiones = req.body.dimensiones;
    const ejes = req.body.ejes;
    const carga = req.body.carga;
    const combustible = req.body.combustible;
    let resultado ='';

    db_con.query(
        'CALL AltaTipoCamion(?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTipo, descripcion, dimensiones, ejes, carga,combustible], // Pasa los parámetros requeridos por el procedimiento almacenado
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
    modificarTipoCamion: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const idTipo = req.body.idTipo;
    const descripcion = req.body.descripcion;
    const dimensiones = req.body.dimensiones;
    const ejes = req.body.ejes;
    const carga = req.body.carga;
    const combustible = req.body.combustible;
    let resultado ='';

    db_con.query(
        'CALL ModificarTipoCamion(?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTipo, descripcion, dimensiones, ejes,carga,combustible], // Pasa los parámetros requeridos por el procedimiento almacenado
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
    eliminarTipoCamion: function(req, res){
    //POST
    // Llama al procedimiento almacenado
    const idTipo = req.body.idTipo;
    let resultado ='';

    db_con.query(
        'CALL EliminarTipoCamion(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTipo], // Pasa los parámetros requeridos por el procedimiento almacenado
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