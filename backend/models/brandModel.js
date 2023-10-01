import mongoose, { Types } from "mongoose";

const brandSchema = new mongoose.Schema({
  brandName: { type: String },
  admin_id: { type: Types.ObjectId, ref: "User" },
});

const BrandModel = mongoose.model("Brand", brandSchema);
export default BrandModel;
