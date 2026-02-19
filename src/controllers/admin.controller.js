import Admin from "../models/Admin.model.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import generateJWT from "../utils/genJWT.js";




//login
const login = expressAsyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }

    const admin = await Admin.findOne({email});
    if(!admin){
    res.status(404);
    throw new Error("Admin not found");

}
     
    const passMatch = await bcrypt.compare(password, admin.password);

    if(admin && passMatch){
        const token =  generateJWT({email: admin.email, id: admin._id});
        res.status(200);
        return res.json({message:"Login successful",token, admin:{name: admin.name, email: admin.email}})

    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }

});


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
    //gen JWT token
    const token =  generateJWT({email: newAdmin.email, id: newAdmin._id});
    newAdmin.token = token;
    

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

//get all admins

// const getAllAdmins = expressAsyncHandler(async(req,res)=>{
//     let admins = await Admin.find();
//     res.json(admins);
// });


export {login, register, deletedAdmin,};