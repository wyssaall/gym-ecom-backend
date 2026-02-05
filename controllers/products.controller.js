import { validationResult } from "express-validator";
import Product from "../models/products.model.js";
import expressAsyncHandler from "express-async-handler";


//get all products

const getAllProducts = expressAsyncHandler(async (req, res) => {
  let products = await Product.find();
  res.json(products);
});


const getOneProduct = expressAsyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  // Optional: Check if product exists and throw error if not
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

const getNewCollection = expressAsyncHandler(async (req, res) => {
  let newProducts = await Product.find({ isNew: true });
  res.json(newProducts);

});

const createProduct = expressAsyncHandler(async (req, res) => {
  let newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  let updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, { new: true });
  if (!updatedProduct) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(updatedProduct);
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  let deleteProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deleteProduct) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json({ message: "Product deleted successfully", deleteProduct });

});

//products by category
const getProductsByCategory = async(req,res)=>{
  let productsByCat = await Product.find({category:req.params.name});
  res.json({message:"Products by category", productsByCat});
}

export { getAllProducts, getOneProduct, getNewCollection, createProduct, updateProduct, deleteProduct, getProductsByCategory };