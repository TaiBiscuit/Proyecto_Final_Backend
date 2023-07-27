import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Faker, en } from '@faker-js/faker';

const faker = new Faker({ locale: [en]});

export const generateProducts = async () => {
    let products = [];
    for(let i = 0; i < 100; i++) {
         products.push({
            id : faker.database.mongodbObjectId(),
            title : faker.commerce.productName(),
            price : faker.commerce.price(),
            description : faker.commerce.productDescription(),
            category : faker.commerce.department(),
            image : faker.image.avatar(),
            stock : faker.string.numeric(2),
            code : faker.string.numeric({length: { min: 2, max: 3}})
         })
    } 
    return products
}

export const errorDict = {
    TITLE_ERROR: {code: 404, msg: 'You forgot to put a title'},
    PRICE_ERROR: {code: 404, msg: 'You forgot to put the price'},
    CATE_ERROR: {code: 404, msg: 'You forgot to choose a category'},
    STOCK_ERROR: {code: 404, msg: 'You forgot to put the stock value'},
    CODE_ERROR: {code: 404, msg: 'You forgot to put a the code value'},

}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname