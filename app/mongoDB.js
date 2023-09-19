const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";
const mongoConexion = new MongoClient(uri);

mongoConexion.connect((err) => {
    if (err) {
      console.log("Error al conectar a MongoDB", err);
    } else {
      console.log("Conexión a MongoDB exitosa");
    }
});
module.exports = mongoConexion;