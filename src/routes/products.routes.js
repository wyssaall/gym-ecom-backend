
import express from 'express'
import { getAllProducts, getNewCollection, getOneProduct, getProductsByCategory } from '../controllers/products.controller.js';


const productsRouter = express.Router();

//get all products
productsRouter.get('/', getAllProducts);  //?limit=2&page=4
productsRouter.get('/category/:name', getProductsByCategory);
//get new collection product
productsRouter.get('/newCollection', getNewCollection);

//get one product
productsRouter.get('/:id', getOneProduct);


export default productsRouter;