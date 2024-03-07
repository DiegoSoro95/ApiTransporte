const { MongoClient } = require('mongodb');

const ip = process.env.MONGOHOST;
const uri = `mongodb://${ip}:27017`;

const mongoConexion = new MongoClient(uri);

mongoConexion.connect((err) => {
    if (err) {
        console.log("Error al conectar a MongoDB", err);
    } else {
        console.log("Conexión a MongoDB exitosa");

        // Seleccionar la base de datos
        const miBaseDeDatos = mongoConexion.db('transportesdb');

        // Intentar acceder a la colección (esto la crea si no existe)
        miBaseDeDatos.createCollection('ubicaciones', (err, result) => {
            if (err) {
                console.log("Error al crear la colección", err);
            } else {
                console.log("Colección creada correctamente");
            }
            
            // Cerrar la conexión después de realizar operaciones
            mongoConexion.close();
        });
    }
});

module.exports = mongoConexion;
