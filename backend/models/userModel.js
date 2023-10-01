import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String },
  userEmail: { type: String },
  userMobile: { type: String },
  userPassword: { type: String },
  role: {
    type: String,
    default: "customer",
    enum: ["customer", "admin"],
  },
  userGstNumber: { type: String },
  userAddress: { type: String },
  profileImage: { type: String },
  date: { type: Date, default: Date.now },
});
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
