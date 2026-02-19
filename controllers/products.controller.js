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
  const products = await query.populate('category');

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
  let product = await Product.findById(req.params.id).populate('category');
  // Optional: Check if product exists and throw error if not
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  res.json(product);
});

const getNewCollection = expressAsyncHandler(async (req, res) => {
  let newProducts = await Product.find({ isNew: true }).populate('category');
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

  let updated = await Product.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
  if (!updated) {
    throw new AppError("Product not found", 404);
  }
  res.json(updated);
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  let deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) {
    throw new AppError("Product not found", 404);
  }
  res.status(200).json({ message: "Product deleted successfully", deleted });

});

//products by category
const getProductsByCategory = expressAsyncHandler(async (req, res) => {
  const categoryParam = req.params.name;
  let query = { category: categoryParam };

  // If the parameter is not a valid ObjectId, assume it's a category name
  // and try to find the category object first to get its ID
  if (!mongoose.Types.ObjectId.isValid(categoryParam)) {
    const categoryObject = await mongoose.model('Category').findOne({ name: categoryParam });
    if (categoryObject) {
      // Search for either the ID or the name string (backward compatibility)
      query = {
        $or: [
          { category: categoryObject._id },
          { category: categoryParam }
        ]
      };
    } else {
      // If no category found by name, still search by name string in case some products use it
      query = { category: categoryParam };
    }
  }

  const productsByCat = await Product.find(query).populate('category');
  res.json({ message: "Products by category", productsByCat });
});

// bulk update products category
const updateProductsCategory = expressAsyncHandler(async (req, res) => {
  const { productIds, categoryId } = req.body;

  if (!productIds || !Array.isArray(productIds)) {
    res.status(400);
    throw new Error("Product IDs are required and must be an array");
  }

  if (!categoryId) {
    res.status(400);
    throw new Error("Category ID is required");
  }

  await Product.updateMany(
    { _id: { $in: productIds } },
    { $set: { category: categoryId } }
  );

  res.status(200).json({ message: "Products category updated successfully" });
});

export { getAllProducts, getOneProduct, getNewCollection, createProduct, updateProduct, deleteProduct, getProductsByCategory, updateProductsCategory };
