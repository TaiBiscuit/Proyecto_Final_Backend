import config from './config.js';
import winston from 'winston';


const devLogger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:"debug"})
    ]
});


const prodLogger = winston.createLogger({
    transports:[
        new winston.transports.File({level:"info", filename:'./src/errors.log'})
    ]
});


export const addLog = async (req, res, next) => {
    req.logger = config.MODE === 'ADMIN' ? devLogger: prodLogger;
    await req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    console.log(req.logger.http)
    next();
}
