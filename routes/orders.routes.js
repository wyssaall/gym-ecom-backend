import express from 'express'
import { createOrder, getClientOrders } from '../controllers/orders.controller.js';

const ordersRouter = express.Router()

ordersRouter.get('/', getClientOrders);
ordersRouter.post('/', createOrder);

export  default ordersRouter;