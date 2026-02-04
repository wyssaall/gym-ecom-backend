import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js';
import productsRouter from './routes/products.routes.js';


dotenv.config()

const app = express();
const port = process.env.PORT;
connectDB();

app.use(express.json());
app.use('/api/products', productsRouter)



app.listen(port,'localhost',()=>{
    console.log(`the server is running at port ${port}`);
    
})