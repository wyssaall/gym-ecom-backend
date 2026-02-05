import Category from "../models/categories.model.js";
import expressAsyncHandler from "express-async-handler";

//get all categories
const getAllCategories = expressAsyncHandler(async (req,res)=>{
let categories = await Category.findAll();
res.json(categories);
}
);

//get one cat

const getOneCategory = expressAsyncHandler(async(req,res)=>{
let oneCategory = await Category.findById(req.params.id);
if(!oneCategory){
    res.status(404);
    throw new Error("Category not found");

}
res.json(oneCategory);
});


//admin create 

const createCategory = expressAsyncHandler(async(req,res)=>{
    let newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json({message:"Category created successfully", newCategory});

}
);
//admin update cat
const updatedCategory = expressAsyncHandler(async(req,res)=>{
let updatedCategory = await Category.findByIdAndUpdate(req.params.id, {$set:{...req.body}})
if(!updatedCategory){
    res.status(404);
    throw new Error("Category not found");

}
res.status(200).json({message:"Category updated successfully",updatedCategory})
});

//admin delete 

const deletedCategory = expressAsyncHandler(async (req,res)=>{
let deletedCategory= await Category.findByIdAndDelete(req.params.id);
if(!deletedCategory){
    res.status(404);
    throw new Error("Category not found");

}
res.status(200).json({message:"Category deleted successfully",deletedCategory});
});


export {getAllCategories, getOneCategory,createCategory,updatedCategory, deletedCategory};