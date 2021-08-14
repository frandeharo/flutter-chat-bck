const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Lectura Parseo Body
app.use(express.json());

// DB Config

const { dbConnection } = require('./db/config').dbConnection();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );


// Mis rutas

app.use('/api/login', require('./routes/auth'));


server.listen( process.env.PORT, ( err ) => {
    if ( err ) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT );

});


