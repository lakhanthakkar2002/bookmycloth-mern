import mongoose, { Types } from "mongoose";

const ProductSchema = new mongoose.Schema({
  product_name: { type: String },
  product_price: { type: Number },
  discount_rate: { type: Number },
  avail_mtr: { type: Number },
  avail_qty: { type: Number },
  is_avail: { type: Boolean, default: true },
  cgst_rate: { type: Number },
  sgst_rate: { type: Number },
  igst_rate: { type: Number },
  images: { type: Array },
  hsn_code: { type: String },
  colors: { type: Array },
  product_desc: { type: String },
  brand_id: { type: Types.ObjectId, ref: "Brand" },
  subcat_id: { type: Types.ObjectId, ref: "SubCategorie" },
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
