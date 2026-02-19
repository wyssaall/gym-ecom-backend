import express from 'express'
import { createCategory, deletedCategory, getAllCategories, getOneCategory, updatedCategory } from '../controllers/categories.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import upload from '../utils/uploadFile.js';

const categoryAdminRouter = express.Router();
categoryAdminRouter.use(verifyToken);

//get all
categoryAdminRouter.get('/', getAllCategories);

//get one
categoryAdminRouter.get('/:id', getOneCategory);

//create
categoryAdminRouter.post('/', upload.single('image'), createCategory);

//update
categoryAdminRouter.put('/:id', upload.single('image'), updatedCategory);

//delete
categoryAdminRouter.delete('/:id', deletedCategory);

export default categoryAdminRouter;
