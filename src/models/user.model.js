import mongoose from 'mongoose';

mongoose.pluralize(null);
const collection = 'users';

const schema = new mongoose.Schema({
    firstName: Number,
    lastName: { type: String, required: true },
    email: String,
    password: { type: String, required: true },
    age: { type: String, required:true },
    avatar: { type: String, required: true },
    cart: {
        type: mongoose.Schema.Types.ObjectId.apply,
        ref: 'carts',
    }
});

const userModel = mongoose.model(collection, schema);

export default userModel;