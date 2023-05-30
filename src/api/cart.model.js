import mongoose from 'mongoose';



mongoose.pluralize(null);
const collection = 'carts';

const schema = new mongoose.Schema({
    id: Number,
    products:[{
        pid: { type: mongoose.Schema.Types.ObjectId},
        qty: Number
    }

    ]
});



const cartModel = mongoose.model(collection, schema);

export default cartModel;