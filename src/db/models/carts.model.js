import mongoose from "mongoose";

const cartsShema = new mongoose.Schema({
  products: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Products",
    },
  ],

  quantity: {
    type: Number,
    default: 1,
  },
});
export const cartsModel = mongoose.model("Carts", cartsShema);
