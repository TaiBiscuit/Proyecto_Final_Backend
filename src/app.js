import express from 'express';
import cors from 'cors';
import config from './config.js';
import MongoSingleton from './services/mongo.class.js';
import http from 'http';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';


const app = express();
const server = http.createServer(app);

//EXPRESS

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        credentials: false
    }
});

app.use('/public', express.static(`${__dirname}/public`));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/api', cartsRouter);
app.use('/api', productsRouter);





//MONGOOSE

try {
    MongoSingleton.getInstance();

    server.listen(config.PORT, () => {
        console.log(`Server connected at ${config.PORT}`);
    });
} catch (err) {
    console.log(err)
}


//SOCKET


let prodList = [];

io.on('connection', sock => {
    console.log('New connection started');
    sock.emit('prodList', prodList);
    sock.on('addProd', () => { 
        io.sockets.emit('prodList', prodList);
    });
    sock.on('delProd', () => {
        io.sockets.emit('prodList', prodList);
    });
});  
