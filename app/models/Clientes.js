var mysqlModel = require('mysql-model')

let MyAppModel = mysqlModel.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
});

var Clientes = MyAppModel.extend({
    tableName: "cliente",
});

module.exports = Clientes