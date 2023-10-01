import { Router } from "express";

import {
  POSTAdminSignup,
  POSTAdminLogin,
  GETAdminDetail,
  POSTUpdateProfile,
  POSTAddBrand,
  POSTUpdateBrand,
  GETAllBrands,
  POSTAddCategory,
  GETAllCategories,
  GETCategoryById,
  POSTUpdateCategory,
  GETBrandById,
  POSTAddSubCategory,
  GETAllSubCategories,
  GETSubCatById,
  POSTUpdateSubCat,
  POSTAddColor,
  GETAllColors,
  GETColorById,
  POSTUpdateColor,
  POSTAddProduct,
  GETAllProducts,
  GETProductById,
  POSTUpdateProduct,
} from "../controller/adminController.js";

import { fileURLToPath } from "url";

// import { singleImage } from "../middleware/SingleImageUpload.js";
import multer from "multer";
import path from "path";
const adminrouter = Router();
import userAuth from "../middleware/user.auth.js";
// const uploadSingleImage = multer({
//   dest: "images/",
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype !== "image/png" &&
//       file.mimetype !== "image/jpeg" &&
//       file.mimetype !== "image/jpg"
//     ) {
//       return cb(new Error("Only images are allowed"));
//     }
//     cb(null, true);
//   },
//   storage: multer.diskStorage({
//     filename: (req, file, cb) => {
//       file.originalname + "_Profile" + Date.now;
//       cb(null, file.originalname);
//     },
//     destination: (req, file, cb) => {
//       cb(null, "images/");
//     },
//   }),
// });

// const __filename = fileURLToPath(import.meta.path);
// const __dirname = path.dirname(__filename);

const upload = multer({
  dest: "./public/data/uploads/",
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg"
    ) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      file.originalname = Date.now() + "_" + file.originalname;
      cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
      cb(null, "./public/data/uploads/");
    },
  }),
});

adminrouter.post("/signup", upload.single("uploaded_file"), POSTAdminSignup);
adminrouter.post("/login", POSTAdminLogin);
adminrouter.get("/fetchprofile", userAuth, GETAdminDetail);
adminrouter.put("/updateprofile", userAuth, POSTUpdateProfile);
adminrouter.post("/addbrand", userAuth, POSTAddBrand);
adminrouter.put("/updatebrand/:id", userAuth, POSTUpdateBrand);
adminrouter.get("/getallbrands", userAuth, GETAllBrands);
adminrouter.post("/addcategory", userAuth, POSTAddCategory);
adminrouter.get("/getbrandbyid/:id", userAuth, GETBrandById);
adminrouter.get("/getallcategories", userAuth, GETAllCategories);
adminrouter.get("/getcategorybyid/:id", userAuth, GETCategoryById);
adminrouter.put("/updatecategory/:id", userAuth, POSTUpdateCategory);
adminrouter.post("/addsubcat", userAuth, POSTAddSubCategory);
adminrouter.get("/getallsubcat", userAuth, GETAllSubCategories);
adminrouter.get("/getsubcatbyid/:id", userAuth, GETSubCatById);
adminrouter.put("/updatesubcategory/:id", userAuth, POSTUpdateSubCat);

// pending thinking
adminrouter.post("/addproductcolor", userAuth, POSTAddColor);
adminrouter.get("/getallcolors", userAuth, GETAllColors);
adminrouter.get("/getcolorbyid/:id", userAuth, GETColorById);
adminrouter.put("/updatecolorbyid/:id", userAuth, POSTUpdateColor);

adminrouter.post(
  "/addproduct",
  userAuth,
  upload.array("images"),
  POSTAddProduct
);
adminrouter.get("/getallproducts", userAuth, GETAllProducts);
adminrouter.get("/getproductbyid/:id", userAuth, GETProductById);
adminrouter.put("/updateproduct/:id", userAuth, POSTUpdateProduct);
//pending updation of products...
export default adminrouter;
