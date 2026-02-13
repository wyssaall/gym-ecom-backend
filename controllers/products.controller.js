import { validationResult } from "express-validator";
import Product from "../models/products.model.js";
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";


//get all products

const getAllProducts = expressAsyncHandler(async (req, res) => {
  //  Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced filtering query (gte, gt, lte, lt)
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let queryConditions = JSON.parse(queryStr);

  // Search (Name & Description)
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    queryConditions.$or = [
      { name: searchRegex },
      { description: searchRegex }
    ];
  }

  // Build the query
  let query = Product.find(queryConditions);

  //  Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Execute query
  const products = await query;

  // Get total count for pagination info
  const total = await Product.countDocuments(queryConditions);

  res.json({
    products,
    total,
    page,
    pages: Math.ceil(total / limit)
  });
});


const getOneProduct = expressAsyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  // Optional: Check if product exists and throw error if not
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  res.json(product);
});

const getNewCollection = expressAsyncHandler(async (req, res) => {
  let newProducts = await Product.find({ isNew: true });
  res.json(newProducts);

});

const createProduct = expressAsyncHandler(async (req, res) => {
  const imagePaths = req.files ? req.files.map(file => file.path.replace(/\\/g, "/")) : [];

  if (!imagePaths || imagePaths.length === 0) {
    res.status(400);
    throw new Error("At least one image is required");
  }

  let newProduct = new Product({
    ...req.body,
    images: imagePaths
  });
  await newProduct.save();
  res.json(newProduct);
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  let updateData = { ...req.body };

  if (req.files && req.files.length > 0) {
    updateData.images = req.files.map(file => file.path.replace(/\\/g, "/"));
  }

  let updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
  if (!updatedProduct) {
    throw new AppError("Product not found", 404);
  }
  res.json(updatedProduct);
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  let deleteProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deleteProduct) {
    throw new AppError("Product not found", 404);
  }
  res.status(200).json({ message: "Product deleted successfully", deleteProduct });

});

//products by category
const getProductsByCategory = expressAsyncHandler(async (req, res) => {
  let productsByCat = await Product.find({ category: req.params.name });
  res.json({ message: "Products by category", productsByCat });
});

export { getAllProducts, getOneProduct, getNewCollection, createProduct, updateProduct, deleteProduct, getProductsByCategory };