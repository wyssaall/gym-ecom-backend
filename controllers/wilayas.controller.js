import Wilaya from "../models/wilayas.model.js";
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";

// Public: get all wilayas (for checkout)
const getAllWilayas = expressAsyncHandler(async (req, res) => {
  const wilayas = await Wilaya.find().sort({ name: 1 });
  res.json(wilayas);
});

// Admin: get all
const adminGetAll = expressAsyncHandler(async (req, res) => {
  const wilayas = await Wilaya.find().sort({ name: 1 });
  res.json(wilayas);
});

// Admin: create
const createWilaya = expressAsyncHandler(async (req, res) => {
  const { name, code, shippingPrice } = req.body;
  const exists = await Wilaya.findOne({ name: name?.trim() });
  if (exists) {
    res.status(400);
    throw new Error("Une wilaya avec ce nom existe déjà");
  }
  const wilaya = new Wilaya({
    name: name?.trim(),
    code: code != null ? Number(code) : undefined,
    shippingPrice: shippingPrice != null ? Number(shippingPrice) : 0,
  });
  await wilaya.save();
  res.status(201).json({ message: "Wilaya créée", wilaya });
});

// Admin: update
const updateWilaya = expressAsyncHandler(async (req, res) => {
  const { name, code, shippingPrice } = req.body;
  const wilaya = await Wilaya.findById(req.params.id);
  if (!wilaya) {
    throw new AppError("Wilaya non trouvée", 404);
  }
  if (name != null) wilaya.name = name.trim();
  if (code != null) wilaya.code = Number(code);
  if (shippingPrice != null) wilaya.shippingPrice = Number(shippingPrice);
  await wilaya.save();
  res.json({ message: "Wilaya mise à jour", wilaya });
});

// Admin: delete
const deleteWilaya = expressAsyncHandler(async (req, res) => {
  const wilaya = await Wilaya.findByIdAndDelete(req.params.id);
  if (!wilaya) {
    throw new AppError("Wilaya non trouvée", 404);
  }
  res.json({ message: "Wilaya supprimée" });
});

export { getAllWilayas, adminGetAll, createWilaya, updateWilaya, deleteWilaya };
