import mongoose, { Types } from "mongoose";

const subcategorySchema = new mongoose.Schema({
  subcat_name: { type: String },
  cat_id: { type: Types.ObjectId, ref: "Categorie" },
  admin_id: { type: Types.ObjectId, ref: "User" },
});

const SubCatModel = mongoose.model("SubCategorie", subcategorySchema);
export default SubCatModel;
