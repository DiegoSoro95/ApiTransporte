var Gastos = require('../models/Gastos')
var db_con = require('../db')

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    listarGastosPorTransporte: function(req,res){
      const idTransporte = req.query.idTransporte;
      //GET
      db_con.query(
        'CALL ListarGastosPorTransporte(?)', // Pasa los parámetros requeridos por el procedimiento almacenado
        [idTransporte],
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
    iniciarRegistroGastos: function(req, res) {
      // Configura multer como middleware para manejar datos de formulario multiparte
      const formdataMiddleware = upload.single('imagen'); // Ajusta el nombre del campo según tu formulario
    
      formdataMiddleware(req, res, function(err) {
        if (err) {
          return res.status(500).json({
            message: 'Error al procesar los datos del formulario',
          });
        }
    
        // Continúa con la lógica de tu función
        const idTransporte = req.body.idTransporte;
        const monto = req.body.monto;
        const observacion = req.body.observacion;
        let imageUrl = '';
        let resultado = '';
    
        if (req.file) {
          // Configura la ruta para el directorio "uploads"
          const uploadsDirectory = path.join(__dirname, '../../uploads'); // Ajusta la ruta según tu estructura
          // Crea el directorio "uploads" si no existe
          if (!fs.existsSync(uploadsDirectory)) {
            fs.mkdirSync(uploadsDirectory);
          }

          const uploadedFileName = req.file.originalname;
          const newFilePath = path.join(uploadsDirectory, uploadedFileName); // Cambia la ruta a la raíz del servidor

          // Escribe el buffer en el nuevo archivo
          fs.writeFileSync(newFilePath, req.file.buffer);
  
          // Construye la URL de la imagen
          imageUrl = `http://127.0.0.1:4000/uploads/${uploadedFileName}`; 
        }
    
        db_con.query(
          'CALL IniciarRegistroGasto(?,?,?,?,@resultado)',
          [idTransporte, monto, observacion, imageUrl],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                message: 'Error comuníquese con sistemas',
              });
            }
    
            // Obtener el valor del parámetro de salida
            db_con.query('SELECT @resultado AS resultado', (err, results) => {
              if (err) {
                return res.status(500).json({
                  message: 'Error comuníquese con sistemas',
                });
              } else {
                resultado = results[0].resultado;
    
                if (resultado == null) {
                  resultado = 'Gasto agregado con éxito';
                }
    
                return res.status(200).json({
                  message: resultado,
                });
              }
            });
          }
        );
      });
    },
    modificarGastos: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const idGasto = req.body.idGasto;
      const monto = req.body.monto;
      const observacion = req.body.observacion;
      const fecha = req.body.fecha;
  
      let resultado ='';
  
      db_con.query(
          'CALL ModificarGasto(?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
          [idGasto, monto, observacion,fecha], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                  resultado = 'Gasto modificado con éxito';
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
    eliminarGastos: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const idGasto = req.body.idGasto;
  
      let resultado ='';
  
      db_con.query(
          'CALL EliminarGasto(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
          [idGasto], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                  resultado = 'Gasto eliminado con éxito';
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