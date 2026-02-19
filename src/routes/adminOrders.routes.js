import express from 'express'
import { deleteOrder, getAllOrders, updatedOrder } from '../controllers/orders.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const ordersAdminRouter = express.Router()
ordersAdminRouter.use(verifyToken);
ordersAdminRouter.get('/', getAllOrders);
ordersAdminRouter.put('/:id', updatedOrder);
ordersAdminRouter.delete('/:id', deleteOrder);


export  default ordersAdminRouter;