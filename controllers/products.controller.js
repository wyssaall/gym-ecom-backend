import { validationResult } from "express-validator";
import Product from "../models/products.model.js";


//get all products

const getAllProducts = async (req, res)=>{
  let products = await Product.find();
  res.json(products);
}


const getOneProduct = async (req, res)=>{
  let product = await Product.findById(req.params.id);
  res.json(product);
}

const getNewCollection = async(req,res)=>{
let newProducts = await Product.find({isNew:true});
res.json(newProducts);
 
}


export {getAllProducts,getOneProduct,getNewCollection};