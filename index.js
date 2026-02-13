import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js';
import productsRouter from './routes/products.routes.js';
import productsAdminRouter from './routes/adminProducts.routes.js';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';
import categoryRouter from './routes/categories.routes.js';
import categoryAdminRouter from './routes/adminCategories.routes.js';
import AppError from './utils/appError.js';
import ordersAdminRouter from './routes/adminOrders.routes.js';
import ordersRouter from './routes/orders.routes.js';
import adminRouter from './routes/admin.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config()

const app = express();
const port = process.env.PORT;
connectDB();
app.use(cors());


app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productsRouter);
app.use('/api/admin/products', productsAdminRouter);

app.use('/api/categories', categoryRouter);
app.use('/api/admin/categories', categoryAdminRouter);

app.use('/api/orders', ordersRouter);
app.use('/api/admin/orders', ordersAdminRouter);

app.use('/api/admin', adminRouter);
app.use((req, res, next) => {
    next(new AppError(`Not Found - ${req.originalUrl}`, 404));
});

app.use(errorHandler); //global error handler middleware

app.listen(port, 'localhost', () => {
    console.log(`the server is running at port ${port}`);

})