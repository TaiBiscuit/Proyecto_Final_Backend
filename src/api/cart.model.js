import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);
const collection = 'carts';

const schema = new mongoose.Schema({
    id: Number,
    products:{
        type: [
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                }
            }
        ],
        default:[]
    }
});

  schema.pre('find', function() {
    this.populate('products.product')
}); 

schema.plugin(mongoosePaginate);

const cartModel = mongoose.model(collection, schema);

export default cartModel;