import mongoose from 'mongoose';
import config from '../config.js';


export default class MongoSingleton {
    static #instance;

    constructor() {
        mongoose.connect(config.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MongoSingleton();
            console.log(`Server connected at 3000`);
        } else {
            console.log('Conexión bbdd RECUPERADA');
        }

        return this.#instance;
    }
}