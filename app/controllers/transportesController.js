var Transportes = require('../models/Transportes')
var db_con = require('../db')
var mongoConexion = require('../mongoDB');

module.exports = {
    buscarTransporte: function(req,res){
        const idTransporte = req.query.idTransporte;

        //GET
        db_con.query(
          'CALL BuscarTransporte(?)', // Pasa los parámetros requeridos por el procedimiento almacenado
          [idTransporte],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                message: 'Error comuniquese con sistemas'
              })
            }
    
            if(results[0].length == 0) {
              return res.status(200).json( {
                message: 'No existe dicho transporte'
              })
            }
            else{
              return res.status(200).json( {
                message: 'Existe dicho transporte',
                listado: results[0],
              })
            }
          }
        );
    },
    agregarFechaLlegada: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const idTransporte = req.body.idTransporte;
      const fechaFin = req.body.fechaFin;
      let resultado ='';
  
      db_con.query(
        'CALL AgregarFechaLLegada(?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTransporte, fechaFin], // Pasa los parámetros requeridos por el procedimiento almacenado
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
            } 
            else {
              resultado = results[0].resultado;
  
              if (resultado == null){
                resultado = 'Se actualizó la hora de llegada';
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
    listadoTransportesAsignados: function(req, res){
      const idChofer = req.query.idChofer;

      //GET
      db_con.query(
        'CALL ListarTransportesChofer(?)', // Pasa los parámetros requeridos por el procedimiento almacenado
        [idChofer],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          }
  
          if(results[0].length == 0) {
            return res.status(200).json( {
              message: 'No existen trasportes para dicho chofer'
            })
          }
          else{
            return res.status(200).json( {
              message: 'Existen trasportes para dicho chofer',
              listado: results[0],
            })
          }
        }
      );
    },
    listarTransporteSinChofer: function(req, res){
    
      //GET
      db_con.query(
          'CALL ListadoTransporteSinChofer()', // Pasa los parámetros requeridos por el procedimiento almacenado
          (err, results) => {
          if (err) {
              return res.status(500).json({
              message: 'Error comuniquese con sistemas'
              })
          }
  
          if(results[0].length == 0) {
              return res.status(200).json( {
              message: 'No existen transportes sin chofer'
              })
          }
          else{
              return res.status(200).json( {
              message: 'Existen transportes sin chofer',
              listado: results[0],
              })
          }
          }
      );
    },
    listarTransportes: function(req, res){
    
      //GET
      db_con.query(
          'CALL ListarTransportes()', // Pasa los parámetros requeridos por el procedimiento almacenado
          (err, results) => {
          if (err) {
              return res.status(500).json({
                message: 'Error comuniquese con sistemas'
              })
          }
  
          if(results[0].length == 0) {
              return res.status(200).json( {
                message: 'No existen transportes'
              })
          }
          else{
              return res.status(200).json( {
                message: 'Existen transportes',
                listado: results[0],
              })
          }
          }
      );
    },
    inicioTransporte: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const idTransporte = req.body.idTransporte;
      let resultado ='';
  
      db_con.query(
        'CALL IniciarTransporte(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTransporte], // Pasa los parámetros requeridos por el procedimiento almacenado
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
            } 
            else {
              resultado = results[0].resultado;
  
              if (resultado == null){
                resultado = 'Se inició el transporte exitosamente';
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
    finalizarTransporte: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const idTransporte = req.body.idTransporte;
      let resultado ='';
  
      db_con.query(
        'CALL FinalizarTransporte(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTransporte], // Pasa los parámetros requeridos por el procedimiento almacenado
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
            } 
            else {
              resultado = results[0].resultado;
  
              if (resultado == null){
                resultado = 'Se finalizó el transporte exitosamente';
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
    listadoTranporteTiempoReal: async function(req, res) {
      try {
        // GET
        db_con.query(
          'CALL ListadoTransporteTiempoReal()', 
          async (err, results) => {
            if (err) {
              return res.status(500).json({
                message: 'Error comuníquese con sistemas'
              });
            }
    
            if (results[0].length === 0) {
              return res.status(200).json({
                message: 'No existen transportes en tiempo real'
              });
            } else {
              const transportes = results[0];
    
              for (const transporte of transportes) {
                const idTransporte = transporte.id_transporte;
    
                const db = mongoConexion.db('transportesdb');
    
                try {
                  const resultado = await db.collection('ubicaciones')
                    .find({ idTransporte: idTransporte.toString() })
                    .sort({ _id: -1 })
                    .limit(1)
                    .toArray();
                  
                  if (resultado.length > 0) {
                    transporte.latitud = resultado[0].latitud;
                    transporte.longitud = resultado[0].longitud;
                  }
                } catch (error) {
                  console.error('Error en la consulta MongoDB:', error);
                }
              }
    
              return res.status(200).json({
                message: 'Existen transportes en tiempo real',
                listado: transportes
              });
            }
          }
        );
      } catch (error) {
        console.error('Error general:', error);
        return res.status(500).json({
          message: 'Error general'
        });
      }
    },
    listadoTransporteSinChofer: function(req, res){
      //GET
      db_con.query(
        'CALL ListadoTransporteSinChofer()', // Pasa los parámetros requeridos por el procedimiento almacenado
        (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          }
  
          if(results[0].length == 0) {
            return res.status(200).json( {
              message: 'No existen trasportes sin chofer'
            })
          }
          else{
            return res.status(200).json( {
              message: 'Existen trasportes sin chofer',
              listado: results[0],
            })
          }
        }
      );
    },
    listadoTransporteFinalizado: function(req, res){
      //GET
      db_con.query(
        'CALL ListadoTransporteFinalizado()', // Pasa los parámetros requeridos por el procedimiento almacenado
        (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          }
  
          if(results[0].length == 0) {
            return res.status(200).json( {
              message: 'No existen trasportes finalizados'
            })
          }
          else{
            return res.status(200).json( {
              message: 'Existen trasportes finalizados',
              listado: results[0],
            })
          }
        }
      );
    },
    asignarTransporte: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const idTransporte = req.body.idTransporte;
      const idChofer = req.body.idChofer;
      const idCamion = req.body.idCamion;
      let resultado ='';
  
      db_con.query(
        'CALL AsignarTransporte(?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTransporte,idChofer,idCamion], // Pasa los parámetros requeridos por el procedimiento almacenado
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
            } 
            else {
              resultado = results[0].resultado;
  
              if (resultado == null){
                resultado = 'Se asignó el chofer al transporte exitosamente';
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
    listadoTransportesNoRealizados: function(req, res){
      //GET
      db_con.query(
        'CALL ListadoTransportesNoRealizados()', // Pasa los parámetros requeridos por el procedimiento almacenado
        (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          }
  
          if(results[0].length == 0) {
            return res.status(200).json( {
              message: 'No existen trasportes sin realizar'
            })
          }
          else{
            return res.status(200).json( {
              message: 'Existen trasportes sin realizar',
              listado: results[0],
            })
          }
        }
      );
    },
    altaTransporteSinChofer: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const fechaInicio = req.body.fechaInicio;
      const kmRecorridos = req.body.kmRecorridos;
      const origen = req.body.origen;
      const destino = req.body.destino;
      const matricula = req.body.matricula;
      const cliente = req.body.cliente;
      const idAdmin = req.body.idAdmin;
      let resultado ='';
  
      db_con.query(
        'CALL AltaTransporteSinChofer(?,?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [fechaInicio,kmRecorridos,origen,destino,matricula,cliente,idAdmin], // Pasa los parámetros requeridos por el procedimiento almacenado
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
            } 
            else {
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
    altaTransporteConChofer: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const fechaInicio = req.body.fechaInicio;
      const kmRecorridos = req.body.kmRecorridos;
      const origen = req.body.origen;
      const destino = req.body.destino;
      const matricula = req.body.matricula;
      const cliente = req.body.cliente;
      const idChofer = req.body.idChofer;
      const idAdmin = req.body.idAdmin;
      let resultado ='';
  
      db_con.query(
        'CALL AltaTransporteConChofer(?,?,?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [fechaInicio,kmRecorridos,origen,destino,matricula,idChofer,cliente,idAdmin], // Pasa los parámetros requeridos por el procedimiento almacenado
        (err, results) => {
          if (err) {
            console.log(err);

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
            } 
            else {
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
    modificarTransporte: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const idTransporte = req.body.idTransporte;
      const fechaInicio = req.body.fechaInicio;
      const kmRecorridos = req.body.kmRecorridos;
      const origen = req.body.origen;
      const destino = req.body.destino;
      const matricula = req.body.matricula;
      const cliente = req.body.cliente;
      const idChofer = req.body.idChofer;
      let resultado ='';
  
      db_con.query(
        'CALL ModificarTransporte(?,?,?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTransporte,fechaInicio,kmRecorridos,origen,destino,matricula,idChofer,cliente], // Pasa los parámetros requeridos por el procedimiento almacenado
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
            } 
            else {
              resultado = results[0].resultado;
  
              if (resultado == null){
                resultado = 'Se modificó el transporte exitosamente';
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
    eliminarTransporte: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const idTransporte = req.body.idTransporte;
      let resultado ='';
  
      db_con.query(
        'CALL EliminarTransporte(?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTransporte], // Pasa los parámetros requeridos por el procedimiento almacenado
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
            } 
            else {
              resultado = results[0].resultado;
  
              if (resultado == null){
                resultado = 'Se eliminó el transporte exitosamente';
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
    ubicacionReal: function(req,res){

      const idTransporte = req.body.idTransporte.toString();
      const latitud = req.body.latitud.toString();
      const longitud = req.body.longitud.toString();

      const db= mongoConexion.db('transportesdb');
      const collection = db.collection('ubicaciones');

      // Documento a insertar
      const ubicaciones = {
        idTransporte: idTransporte,
        latitud: latitud,
        longitud: longitud
      };

      const resultado =  collection.insertOne(ubicaciones);

      // Cierra la conexión
      return res.status(200).json( {
        message: "Datos ingresados correctamente"
      })
    },
      
}