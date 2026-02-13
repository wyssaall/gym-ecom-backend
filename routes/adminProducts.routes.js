import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getOneProduct, getProductsByCategory, updateProduct } from '../controllers/products.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import { productValidator, validate } from '../validators/validator.js';


const productsAdminRouter = express.Router();
productsAdminRouter.use(verifyToken);

//get all products
productsAdminRouter.get('/', getAllProducts);
productsAdminRouter.post('/',productValidator, validate, createProduct);
productsAdminRouter.get('/category/:name', getProductsByCategory);

productsAdminRouter.get('/:id', getOneProduct);
productsAdminRouter.put('/:id', updateProduct);
productsAdminRouter.delete('/:id', deleteProduct);








export default productsAdminRouter;