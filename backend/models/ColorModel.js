import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
  product_color: { type: String },
});
const ColorModel = mongoose.model("Color", ColorSchema);
export default ColorModel;
