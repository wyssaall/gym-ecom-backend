import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getOneProduct, getProductsByCategory, updateProduct } from '../controllers/products.controller.js';


const productsAdminRouter = express.Router();
//get all products
productsAdminRouter.get('/', getAllProducts);
productsAdminRouter.post('/', createProduct);
productsAdminRouter.get('/category/:name', getProductsByCategory);

productsAdminRouter.get('/:id', getOneProduct);
productsAdminRouter.put('/:id', updateProduct);
productsAdminRouter.delete('/:id', deleteProduct);








export default productsAdminRouter;