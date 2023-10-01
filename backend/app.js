import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";
import adminrouter from "./routes/adminRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/admin/", adminrouter);

const PORT = process.env.PORT || 9999;

// "mongodb://127.0.0.1:27017/BookMyCloths"
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected");
});

app.listen(9999, () => {
  console.log("connected with the server 9999");
});
