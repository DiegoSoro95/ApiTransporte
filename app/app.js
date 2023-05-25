var express = require('express') //llamamos a Express
var app = express()       
var bodyParser = require('body-parser') 

/*toda la configuración de bbdd la hacemos en un fichero a parte*/
require('./db')

var port = process.env.PORT || 4000  // establecemos nuestro puerto

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())            

// nuestra ruta irá en http://localhost:8080/api
// es bueno que haya un prefijo, sobre todo por el tema de versiones de la API
var router = require('./routes')
app.use('/api', router)

//arrancamos el servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)