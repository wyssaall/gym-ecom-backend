import Order from '../models/orders.model.js';
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import Product from '../models/products.model.js';




//user all orders
const getClientOrders = expressAsyncHandler(async (req, res) => {
    const query = req.query;
    const limit = Number(query.limit) || 2;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * limit;

  const orders = await Order.find({ "customer.phone": req.query.customerPhone }).limit(limit).skip(skip);
   if (orders.length === 0) {
      return res.status(404).json({
        message: "No orders found for this customer"
      });
    }

      const customer = orders[0].customer;

    let allItems = [];
    let globalTotal = 0;

    // Merge items + calculate total
    orders.forEach(order => {
      allItems = allItems.concat(order.items);
      globalTotal += order.total;
    });
   res.json({
      customer,
      items: allItems,
      total: globalTotal,
      ordersCount: orders.length
    });
});


//create order

const createOrder = expressAsyncHandler(async (req, res) => {
    const { items } = req.body;

    // 1. Validate Stock for ALL items first
    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
            res.status(404);
            throw new Error(`Product not found: ${item.name}`);
        }
        if (product.stock < item.quantity) {
            res.status(400);
            throw new Error(`Insufficient stock for product: ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
        }
    }

    // 2. Decrement Stock (use $inc to avoid re-validating full document; some products may have category as string in DB)
    for (const item of items) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    // 3. Create Order
    let newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", newOrder });
});


//admin 
//get all orders

const getAllOrders = expressAsyncHandler(async(req,res)=>{
        const query = req.query;
    const limit = Math.min(Number(query.limit) || 50, 500);
    const page = Number(query.page) || 1;
    const skip = (page - 1) * limit;
    const orders = await Order.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
    const total = await Order.countDocuments();
    res.json({ orders, total, page, pages: Math.ceil(total / limit) });
});

//update 
const updatedOrder = expressAsyncHandler(async(req,res)=>{
    let updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set:{...req.body}})
    if(!updatedOrder){
        throw new AppError("Order not found", 404);
    }
    res.json({message:"Order updated successfully",updatedOrder});
});

//admin delete
const deleteOrder = expressAsyncHandler(async(req,res)=>{
    let deleteOrder = await Order.findByIdAndDelete(req.params.id);
    if(!deleteOrder){
        throw new AppError("Order not found", 404);
    }
    res.json({message:"Order deleted successfully"});
});

export {getAllOrders, createOrder, updatedOrder, deleteOrder,getClientOrders };


