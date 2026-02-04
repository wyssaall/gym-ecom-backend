import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from '../controllers/products.controller.js';


const productsAdminRouter = express.Router();
//get all products
productsAdminRouter.get('/', getAllProducts);
productsAdminRouter.post('/', createProduct);

productsAdminRouter.get('/:id', getOneProduct);
productsAdminRouter.put('/:id', updateProduct);
productsAdminRouter.delete('/:id', deleteProduct);








export default productsAdminRouter;