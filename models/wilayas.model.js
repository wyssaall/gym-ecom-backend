import mongoose from "mongoose";

const wilayaSchema = new mongoose.Schema({
  code: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
  },
});
const Wilaya = mongoose.model('Wilaya', wilayaSchema);
export default Wilaya;