import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression';
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
import dashboardRouter from './routes/dashboard.routes.js';
import wilayasRouter from './routes/wilayas.routes.js';
import adminWilayasRouter from './routes/adminWilayas.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config()

const app = express();
const port = process.env.PORT || 5000;;
connectDB();
const allowedOrigins = [
    'https://gym-ecom-frontend.onrender.com',
    'https://gym-ecom-frontend-user.onrender.com',
    'https://gym-admin-dsd3.onrender.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));


app.use(compression());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api/products', productsRouter);
app.use('/api/admin/products', productsAdminRouter);

app.use('/api/categories', categoryRouter);
app.use('/api/admin/categories', categoryAdminRouter);

app.use('/api/orders', ordersRouter);
app.use('/api/admin/orders', ordersAdminRouter);
app.use('/api/admin/dashboard', dashboardRouter);

app.use('/api/wilayas', wilayasRouter);
app.use('/api/admin/wilayas', adminWilayasRouter);

app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('API is running....');
});

app.use((req, res, next) => {
    next(new AppError(`Not Found - ${req.originalUrl}`, 404));
});

app.use(errorHandler); //global error handler middleware

app.listen(port, "0.0.0.0", () => {
    console.log(`the server is running at port ${port}`);

})