import mongoose from 'mongoose';



mongoose.pluralize(null);
const collection = 'tickets';

const schema = new mongoose.Schema({
    id: Number,
    code: String,
    purchase_datetime: Number,
    amount: Number,
    purchaser: String,
});



const cartModel = mongoose.model(collection, schema);

export default cartModel;