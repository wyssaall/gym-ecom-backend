import express from 'express'
import {getAdmin, register, deletedAdmin} from '../controllers/admin.controller.js'

const adminRouter = express.Router()

adminRouter.get('/login', getAdmin);
adminRouter.post('/register', register);
//adminRouter.delete('/:id', deletedAdmin);

export default adminRouter;