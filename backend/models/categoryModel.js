import mongoose, { Types } from "mongoose";

const CategorySchema = new mongoose.Schema({
  category_name: { type: String },
  admin_id: { type: Types.ObjectId, ref: "User" },
});
const CategoryModel = mongoose.model("Categorie", CategorySchema);
export default CategoryModel;
