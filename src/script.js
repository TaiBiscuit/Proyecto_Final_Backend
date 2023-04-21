const fs = require('fs');

class ProductManager {

    static lastId = 0;

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    addProduct =  async (title, description, price, thumbnail, code, stock) => {
        ProductManager.lastId++
        const newProduct = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: ProductManager.lastId,
        }

        const products = await fs.promises.readFile(this.path, 'utf-8');
        const productJSON = JSON.parse(products)
        if(!productJSON.some(product => product.code === newProduct.code)) {
            productJSON.push(newProduct); 
            this.products.push(newProduct);
            const archiveChain = JSON.stringify(productJSON);
            await fs.promises.writeFile(this.path, archiveChain); 
        } else {
            
            console.log('exists!');
            }
        }

    getProduct = async () => {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        const productJSON = JSON.parse(products);
        return productJSON;   
    }

    getProductById = async (idPassed) => {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productJSON = JSON.parse(products);
        const checkId = productJSON.find(product => product.id == idPassed);
        if(checkId === undefined){
            return 'Not Found'
        } else {
            return checkId
        }
    }

    updateProduct = async (idPassed, infoFromBody) =>{
        const infoToChangeArray = Object.keys(infoFromBody).map((key) => [key, infoFromBody[key]])
        const fieldToChange = infoToChangeArray[0][0];
        const infoToChange = infoToChangeArray[0][1];
        console.log(infoToChange)
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productJSON = JSON.parse(products);

        const index = productJSON.findIndex(product => product.id === parseInt(idPassed));
           if (index !== -1){
            productJSON[index][fieldToChange] = infoToChange;
        } else {
             return 'Not Found'
            }
        const archiveChain = JSON.stringify(productJSON);
        this.products = archiveChain;
        await fs.promises.writeFile(this.path, archiveChain);  
    }

    deleteProduct = async (idPassed) =>{
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productJSON = JSON.parse(products);
        const idToDelete = idPassed - 1;
        const checkId = productJSON.find(product => product.id == idPassed);
        if(checkId){
            productJSON.splice(idToDelete, 1);
            const archiveChain = JSON.stringify(productJSON);
            this.products = archiveChain;
            await fs.promises.writeFile(this.path, archiveChain);
        }
        else {
            console.log('Id Not Found')
        }
    }
}

module.exports = ProductManager;
