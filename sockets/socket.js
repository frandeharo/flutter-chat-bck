const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);
    
    // Verifica autenticación
    if ( !valido ){
        return client.disconnect();
    }

    console.log('Cliente autenticado');
    usuarioConectado(uid);

    // Ingresar al usuario a una sala en particular
    // Salas por defecto: Sala global (io.emit) o la sala de client.id

    // Sala individual con el uid del usuario
    client.join( uid );


    client.on('mensaje-personal', async (payload) => {
        // TODO: Grabar mensaje
        await grabarMensaje( payload );
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
