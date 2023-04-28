import express from 'express';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import router from './routes/views.routes.js';

const PORT = 8080;
const server = express();

const httpServer = server.listen(PORT, () =>{
    console.log(`Server opened at port ${PORT}`);
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/public', express.static(`${__dirname}/public`));
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/views');

server.use('/', router);


//Socket

 const socketServer = new Server(httpServer);
let prodList = [];

socketServer.on('connection', sock => {
    console.log('New connection started');
    sock.emit('prodList', prodList);
    sock.on('addProduct', () => { io.sockets.emit('prodList', prodList);});
});  


