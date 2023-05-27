import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const {Schema} = mongoose;

mongoose.pluralize(null);
const collection = 'carts';

const schema = new mongoose.Schema({
    id: Number,
    products:[{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'products'
    }

    ]
});

/* schema.pre('find', function() {
    this.populate('products.products')
});  */

schema.plugin(mongoosePaginate);

const cartModel = mongoose.model(collection, schema);

export default cartModel;