import express from 'express'
import {login, register, deletedAdmin} from '../controllers/admin.controller.js'
import verifyToken from '../middlewares/verifyToken.js';

const adminRouter = express.Router()
// adminRouter.use(verifyToken)
adminRouter.post('/register', register);
adminRouter.post('/login', login);

//adminRouter.delete('/:id', deletedAdmin);

export default adminRouter;