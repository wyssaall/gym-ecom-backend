import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    images: [
      {
        type: String,
        required: true
      }
    ],

    colors: [String],

    sizes: [
      {
        type: String,
        enum: ["S", "M", "L", "XL", "XXL"]
      }
    ],

    stock: {
      type: Number,
      required: true,
      min: 0
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    isNew: {
      type: Boolean,
      default: false
    },

    isSale: {
      type: Boolean,
      default: false
    },

    discount: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["Disponible", "Épuisé"],
      default: "Disponible"
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
