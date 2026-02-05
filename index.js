import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js';
import productsRouter from './routes/products.routes.js';
import productsAdminRouter from './routes/adminProducts.routes.js';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';
import categoryRouter from './routes/categories.routes.js';
import categoryAdminRouter from './routes/adminCategories.routes.js';


dotenv.config()

const app = express();
const port = process.env.PORT;
connectDB();
app.use(cors());


app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/admin/products', productsAdminRouter);

app.use('/api/categories', categoryRouter);
app.use('/api/admin/categories', categoryAdminRouter);

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use(errorHandler);

app.listen(port, 'localhost', () => {
    console.log(`the server is running at port ${port}`);

})