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

const createProduct = async(req, res)=>{
let newProduct = new Product(req.body);
await newProduct.save();
res.json(newProduct);
}

const updateProduct = async(req, res)=>{
    let updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set:{...req.body}}, {new:true});
    res.json(updatedProduct);
}

const deleteProduct = async(req,res)=>{
let deleteProduct = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Product deleted successfully"}, deleteProduct);

}

export {getAllProducts,getOneProduct,getNewCollection, createProduct, updateProduct, deleteProduct};