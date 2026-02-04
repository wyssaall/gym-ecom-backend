import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 customer:{
    name:{
        type:String,
        required:true
    },
    phone: {
    type: String,
    required: true,
    },
 
   wilaya: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wilaya",
    required: true,
   },
    commune:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },

 },
 items:[{
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },


 }],
 total:{
    type:Number,
    required:true
 },
  timestamps: true

})

const Order = mongoose.model('Order',orderSchema);
export default Order;