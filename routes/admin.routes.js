import express from 'express'
import {login, register, deletedAdmin} from '../controllers/admin.controller.js'

const adminRouter = express.Router()

adminRouter.post('/register', register);
adminRouter.post('/login', login);

//adminRouter.delete('/:id', deletedAdmin);

export default adminRouter;