import express from 'express'
import { createCategory, deletedCategory, getAllCategories, getOneCategory, updatedCategory } from '../controllers/categories.controller.js';

const categoryAdminRouter = express.Router();

//get all
categoryAdminRouter.get('/', getAllCategories);

//get one
categoryAdminRouter.get('/:id', getOneCategory);

//create
categoryAdminRouter.post('/', createCategory);

//update
categoryAdminRouter.put('/:id', updatedCategory);

//delete
categoryAdminRouter.delete('/:id', deletedCategory);

export default categoryAdminRouter;
