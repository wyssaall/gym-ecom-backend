import express from 'express'
import {login, register, deletedAdmin} from '../controllers/admin.controller.js'
import verifyToken from '../middlewares/verifyToken.js';
import { adminValidator, validate } from '../validators/validator.js';

const adminRouter = express.Router()
// adminRouter.use(verifyToken)
adminRouter.post('/register',adminValidator, validate, register);
adminRouter.post('/login', login);

//adminRouter.delete('/:id', deletedAdmin);

export default adminRouter;