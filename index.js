//para poder leer nuestras variables de entorno
require('dotenv').config();

//De esta manera es como se realizan la importaciones en node 
//esto se igual a import express from 
const express = require('express');
//configuracion para aceptar peticiones de cualquier lado
const cors = require('cors');

//Ahora vamos a importar nuestro objeto  dbConnection,
//en este caso estamos importandolo como un objeto
const { dbConnection } = require('./database/config');

//Crear el servidor express
const app = express();

//Configurar CORS, es conocido como un middleware, esta es una funcion que
//que se va a ejecutar simpre para para todas las lineas que se tienen abajo
app.use(cors());

//Base de datos
dbConnection();

//console.log(process.env);

//rutas
//para configurar nuestra primera ruta debemos agregar 
//en este caso el "/" y el cuerpo nuestro servicio que 
//se estara ejecutando cuando realicen la peticion 
//pero este se dispara con 2 argumentos que son el request
//y el response para la peticion
app.get( '/', (req, res) => {
    //nuestro respuesta puede regrsar un string, number o un objeto
    //es mas comun responder un objeto.
    //si queremos agregar el estatus de nuestra peticion para probar 
    //los estatus podemos agregar lo siguiente res.status(400).json({
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
} );

//para poder levantar el servidor ejecutamos lo siguiente
//el listen nos pide dos parametros que seria el puerto y el cuerpo 
//que se estara ejecutando cuando levantemos el servidor
app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en el puerto ' + 3000);
});
