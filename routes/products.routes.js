
import express from 'express'
import { getAllProducts, getNewCollection, getOneProduct } from '../controllers/products.controller.js';


const productsRouter = express.Router();

//get all products
productsRouter.get('/', getAllProducts);
//get new collection product
productsRouter.get('/newCollection', getNewCollection);

//get one product
productsRouter.get('/:id', getOneProduct);


export default productsRouter;