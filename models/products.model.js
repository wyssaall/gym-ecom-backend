import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,  
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  colors:[String],
    sizes: [{
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL']
    }],
  stock:{
    type:Number,
    required:true
  },
  category:{
    type:String,
  },
 isNew:{
    type:Boolean,
    default:false
  },
 isSale:{
    type:Boolean,
    default:false
  },
discount:{
    type:Number,
    default:0
  },
  timestamps: true


})
const Product = mongoose.model('Product',productSchema);
export default Product;