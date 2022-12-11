//CREAR SERVIDOR CON EXPRESS
const express = require('express');
const app = express();

//Cargamos servidor http que trae NodeJS
const server = require('http').Server(app);

//El server se lo tenemos ue pasar a socket.io para que sepa que va 
//a estar trabajando con sockets dentro de la conxeion http que generemos
const io = require('socket.io')(server);

const PORT = 6677;

app.use(express.static('client')); //Todo el html que este en carpeta clien se carga


//Ruta de prueba
app.get('/get', (req, res) => {
    res.status(200).send({message:'Buenas tardes'})
});

//Array donde almacenaremos los mensajes
let messages = [{
    id:1,
    text: 'Bienvenido al chat',
    nickName: 'BOT 1'
}];

//Abrimos conexion al Socket
io.on('connection', (socket)=>{
    //Recibe la conexion de los clientes
    console.log("Alguien se conecto al socket " + socket.handshake.address);
    //Emitimos mensaje
    socket.emit('messages', messages);

    //Recogemos evento add-message
    socket.on('add-message', (data) => {
        //Guardamos el mensaje
        messages.push(data);

        //Emitimos nuevamente los mensajes
        io.sockets.emit('messages', messages);
    });
});

server.listen(PORT, function(){
    console.log(`Servidor funcionando en el puerto http://localhost:${PORT}`)
});
