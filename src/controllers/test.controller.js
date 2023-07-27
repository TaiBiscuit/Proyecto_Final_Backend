import { generateProducts } from "../utils.js"

export const mockingProducts = async (req, res) => {
    try {
        const response = await generateProducts();
        res.status(200).send(response);
        
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
}