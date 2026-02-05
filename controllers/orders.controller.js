import Order from '../models/orders.model.js';
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";




//user all orders
const getClientOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ "customer.phone": req.query.customerPhone });
  res.json(orders);
});


//create order

const createOrder = expressAsyncHandler(async(req,res)=>{

    let newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json({messag: "Order created successfully", newOrder});
}
)


//admin 
//get all orders

const getAllOrders = expressAsyncHandler(async(req,res)=>{
    let orders = await Order.find();
    res.json(orders);
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
    res.json({message:"Order deleted successfully",deleteOrder});
});

export {getAllOrders, createOrder, updatedOrder, deleteOrder,getClientOrders };


