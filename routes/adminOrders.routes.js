import express from 'express'
import { deleteOrder, getAllOrders, updatedOrder } from '../controllers/orders.controller.js';

const ordersAdminRouter = express.Router()
ordersAdminRouter.get('/', getAllOrders);
ordersAdminRouter.put('/:id', updatedOrder);
ordersAdminRouter.delete('/:id', deleteOrder);


export  default ordersAdminRouter;