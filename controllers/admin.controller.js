import Admin from "../models/Admin.model.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';




//get  admin
const getAdmin = expressAsyncHandler(async (req,res)=>{
let admin = await Admin.findById(req.params.id);
if(!admin){
    res.status(404);
    throw new Error("Admin not found");
}
res.json(admin);
}
);

//register admin

const register = expressAsyncHandler(async(req,res)=>{
    const {name, email, password} = req.body;
    const adminExists = await Admin.findOne({email});
    if(adminExists){
        res.status(400);
        throw new Error("Admin already exists");
    }
     //password hashing
     const hashedPass = await bcrypt.hash(password, 10);

    if(!name || !email || !password ){
        res.status(400);
        throw new Error("All fields are required");
    }

    let newAdmin = new Admin({name, email, password: hashedPass});
    await newAdmin.save();
    res.status(200).json({message:"admin created successfully", newAdmin:{name: newAdmin.name, email: newAdmin.email}});

}
);

//admin delete

const deletedAdmin = expressAsyncHandler(async (req,res)=>{
let deletedAdmin= await Admin.findByIdAndDelete(req.params.id);
if(!deletedAdmin){
    res.status(404);
    throw new Error("Admin not found");

}
res.status(200).json({message:"Admin deleted successfully",deletedAdmin});
});


export {getAdmin, register, deletedAdmin};