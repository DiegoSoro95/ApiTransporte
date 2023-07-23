var mysqlModel = require('mysql-model')

let MyAppModel = mysqlModel.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
});

var TipoCamiones = MyAppModel.extend({
    tableName: "tipo_camion",
});

module.exports = TipoCamiones