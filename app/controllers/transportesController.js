var Transportes = require('../models/Transportes')

module.exports = {
    buscarTransporte: function(req,res){
        const idTransporte = req.body.idTransporte;

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
                resultado = 'Se actualizo la hora de llegada';
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
      const idChofer = req.body.idChofer;

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
                resultado = 'Se inicio el transporte exitosamente';
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
    listadoTranporteTiempoReal: function(req, res){
      //FALTA PARTE DE MONGO
      //GET
      db_con.query(
        'CALL ListadoTransporteTiempoReal()', // Pasa los parámetros requeridos por el procedimiento almacenado
        (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Error comuniquese con sistemas'
            })
          }
  
          if(results[0].length == 0) {
            return res.status(200).json( {
              message: 'No existen trasportes en tiempo real'
            })
          }
          else{
            return res.status(200).json( {
              message: 'Existen trasportes en tiempo real',
              listado: results[0],
            })
          }
        }
      );
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
    asignarTransporte: function(req, res){
      //POST
      // Llama al procedimiento almacenado
      const idTransporte = req.body.idTransporte;
      const idChofer = req.body.idChofer;
      const idCamion = req.body.idCamion;
      let resultado ='';
  
      db_con.query(
        'CALL IniciarTransporte(?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
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
                resultado = 'Se asigno el chofer al transporte exitosamente';
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
      const fechaFin = req.body.fechaFin;
      const kmRecorridos = req.body.kmRecorridos;
      const origen = req.body.origen;
      const destino = req.body.destino;
      const matricula = req.body.matricula;
      const cliente = req.body.cliente;
      const idAdmin = req.body.idAdmin;
      let resultado ='';
  
      db_con.query(
        'CALL AltaTransporteSinChofer(?,?,?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [fechaInicio,fechaFin,kmRecorridos,origen,destino,matricula,cliente,idAdmin], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                resultado = 'Se dio de alta el transporte exitosamente';
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
      const fechaFin = req.body.fechaFin;
      const kmRecorridos = req.body.kmRecorridos;
      const origen = req.body.origen;
      const destino = req.body.destino;
      const matricula = req.body.matricula;
      const cliente = req.body.cliente;
      const idChofer = req.body.idChofer;
      const idAdmin = req.body.idAdmin;
      let resultado ='';
  
      db_con.query(
        'CALL AltaTransporteConChofer(?,?,?,?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [fechaInicio,fechaFin,kmRecorridos,origen,destino,matricula,idChofer,cliente,idAdmin], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                resultado = 'Se dio de alta el transporte exitosamente';
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
      const fechaFin = req.body.fechaFin;
      const kmRecorridos = req.body.kmRecorridos;
      const origen = req.body.origen;
      const destino = req.body.destino;
      const matricula = req.body.matricula;
      const cliente = req.body.cliente;
      const idChofer = req.body.idChofer;
      let resultado ='';
  
      db_con.query(
        'CALL ModificarTransporte(?,?,?,?,?,?,?,?,?,@resultado)', // Reemplaza 'nombre_procedimiento' con el nombre de tu procedimiento almacenado
        [idTransporte,fechaInicio,fechaFin,kmRecorridos,origen,destino,matricula,idChofer,cliente], // Pasa los parámetros requeridos por el procedimiento almacenado
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
                resultado = 'Se modifico el transporte exitosamente';
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
                resultado = 'Se elimino el transporte exitosamente';
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