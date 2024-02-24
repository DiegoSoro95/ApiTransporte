//dotenv nos permite leer las variables de entorno de nuestro .env
const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql");

let db_con = mysql.createConnection({
    host: process.env.DBHOST || 'db_mysql',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
});
  
db_con.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});
  
module.exports = db_con;