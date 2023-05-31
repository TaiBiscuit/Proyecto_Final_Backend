import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import productRoutes from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const PORT = parseInt(3000);
const MONGOOSE_URL = 'mongodb+srv://Tai:a6CF6dUQvLXPlaNk@clustertest.pmqah19.mongodb.net/coderBackend'
const PAGE_URL = `http://localhost:${PORT}`;
const LIMIT = 10;
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
app.use('/api', productRoutes(io, PAGE_URL, LIMIT));





//MONGOOSE

try {
    await mongoose.connect(MONGOOSE_URL);
    server.listen(PORT, () => {
        console.log(`Server connected at ${PORT}`);
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
