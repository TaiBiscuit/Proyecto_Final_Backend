import ticketModel from '../models/ticket.model.js';
import cartModel from '../models/cart.model.js';
import mongoose from 'mongoose';

class TicketManager {
    
    constructor () {
        this.status = 1
    }

    generateTicket = async (cartId, ticketInfo) => {
        const placeholderUser = {
            email: 'abc@gmail.com', 
        }
        const ticket = ticketInfo;
        console.log(ticket)
/*         const cart = await cartModel.find({id:cartId}).lean().populate({ path: 'products.pid', model: productModel })
        const ticket = ticketModel.create();
        ticket.amount = cart.products.qty; */
        
        return ticket
    }
}

export default TicketManager;