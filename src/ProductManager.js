import * as fs from 'fs';

class ProductManager {
    
    constructor(path) {
        this.path = path;
        this.products = []
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const newProduct = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: 0,
        }

        if( title === undefined || description === undefined || code === undefined || price === undefined || stock === undefined){
            return false
        }

        if( thumbnail === undefined ){
            thumbnail = []
        }

        const products = await fs.promises.readFile(this.path, 'utf-8');
        const productJSON = JSON.parse(products)
        if(!productJSON.some(product => product.code === newProduct.code)) {
            newProduct.id = productJSON[productJSON.length - 1].id + 1;
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
        console.log(this.products)
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
         for (let i = 0; i < infoToChangeArray.length; i++) {            
            const fieldToChange = infoToChangeArray[i][0];
            const infoToChange = infoToChangeArray[i][1];
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


export default ProductManager;
