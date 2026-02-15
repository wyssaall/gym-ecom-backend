import Category from "../models/categories.model.js";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

//get all categories
const getAllCategories = expressAsyncHandler(async (req, res) => {
    let categories = await Category.find();
    res.json(categories);
}
);

//get one cat

const getOneCategory = expressAsyncHandler(async (req, res) => {
    let oneCategory = await Category.findById(req.params.id);
    if (!oneCategory) {
        res.status(404);
        throw new Error("Category not found");

    }
    res.json(oneCategory);
});


//admin create 

//admin create 

const createCategory = expressAsyncHandler(async (req, res) => {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        res.status(400);
        throw new Error("Category already exists");
    }

    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
    if (!imagePath) {
        res.status(400);
        throw new Error("Image is required");
    }

    let newCategory = new Category({
        ...req.body,
        image: imagePath
    });
    await newCategory.save();
    res.status(200).json({ message: "Category created successfully", newCategory });

}
);
//admin update cat
const updatedCategory = expressAsyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if another category has the same name
    if (name) {
        const categoryExists = await Category.findOne({ name });
        if (categoryExists && categoryExists._id.toString() !== req.params.id) {
            res.status(400);
            throw new Error("Category with this name already exists");
        }
    }

    let categoryToUpdate = await Category.findById(req.params.id);
    if (!categoryToUpdate) {
        res.status(404);
        throw new Error("Category not found");
    }

    const oldName = categoryToUpdate.name;

    let updateData = { ...req.body };
    if (req.file) {
        updateData.image = req.file.path.replace(/\\/g, "/");
    }

    let updatedCategory = await Category.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });

    // If name changed, update all products category field
    if (name && name !== oldName) {
        await mongoose.model('Product').updateMany(
            { category: oldName },
            { $set: { category: name } }
        );
    }

    res.status(200).json({ message: "Category updated successfully", updatedCategory })
});

//admin delete 

const deletedCategory = expressAsyncHandler(async (req, res) => {
    let deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
        res.status(404);
        throw new Error("Category not found");

    }
    res.status(200).json({ message: "Category deleted successfully", deletedCategory });
});


export { getAllCategories, getOneCategory, createCategory, updatedCategory, deletedCategory };