import express from 'express'
import { createOrder, getClientOrders } from '../controllers/orders.controller.js';

const ordersRouter = express.Router()

ordersRouter.get('/', getClientOrders); ///api/orders?customerPhone=12345678
ordersRouter.post('/', createOrder);

export  default ordersRouter;