import express from 'express'
import { getAllCategories, getOneCategory } from '../controllers/categories.controller.js';

const categoryRouter = express.Router();

//all categories
categoryRouter.get('/',getAllCategories);

//get one
categoryRouter.get('/:id',getOneCategory);

export default categoryRouter;