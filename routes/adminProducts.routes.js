import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getOneProduct, getProductsByCategory, updateProduct } from '../controllers/products.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import { productValidator, validate } from '../validators/validator.js';
import upload from '../utils/uploadFile.js';


const productsAdminRouter = express.Router();
productsAdminRouter.use(verifyToken);

//get all products
productsAdminRouter.get('/', getAllProducts);
productsAdminRouter.post('/', upload.array('images', 10), productValidator, validate, createProduct);
productsAdminRouter.get('/category/:name', getProductsByCategory);

productsAdminRouter.get('/:id', getOneProduct);
productsAdminRouter.put('/:id', upload.array('images', 10), updateProduct);
productsAdminRouter.delete('/:id', deleteProduct);








export default productsAdminRouter;