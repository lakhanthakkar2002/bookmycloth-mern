import Validator from "validatorjs";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

import config from "../configs/globle.conf.js";

import jwt from "jsonwebtoken";
import BrandModel from "../models/brandModel.js";
import CategoryModel from "../models/categoryModel.js";
import SubCatModel from "../models/SubCategory.js";
import ColorModel from "../models/ColorModel.js";
import ProductModel from "../models/ProductModel.js";

const createTokenPromise = (payload, key, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, options, (error, token) => {
      if (error) return reject(error);
      resolve(token);
    });
  });
};

export const POSTAdminSignup = async (req, res) => {
  console.log("req.body...", req.body);
  console.log("file name .... ", req.file);
  // console.log("req....", req);
  const requestBody = req.body;
  const requestFile = req.file;
  let validationRule = {
    userName: "required",
    userEmail: "required|email",
    userPassword: "required|min:6",
    userMobile: "required",
  };

  let validation = new Validator(requestBody, validationRule);
  //   const chk = validator.check();
  if (validation.fails()) {
    return res.status(400).json({
      error: "validation failed",
      message: validation.errors.all(),
    });
  }

  let imageValidationRule = {
    path: "required",
  };
  let imagevalidation = new Validator(requestFile, imageValidationRule);
  if (imagevalidation.fails()) {
    return res.status(400).json({
      error: "Image validation failed",
      message: imagevalidation.errors.all(),
    });
  }

  const admin = await UserModel.findOne({ userEmail: requestBody.userEmail });
  if (admin) {
    return res.status(400).json({
      error: "Email_Already_Exists",
      message: "Email Already Exists",
      data: admin,
    });
  }

  const hashedPassword = await bcrypt.hash(requestBody.userPassword, 10);

  const newAdmin = await UserModel.create({
    userName: requestBody.userName,
    userEmail: requestBody.userEmail,
    userPassword: hashedPassword,
    userMobile: requestBody.userMobile,
    profileImage: requestFile.path,
    role: "admin",
  });
  return res.json({
    message: "Admin created successfully",
    user_id: newAdmin._id,
  });
};

export const POSTAdminLogin = async (req, res) => {
  const requestBody = req.body;
  console.log("req.body....", req.body);
  const validationRule = {
    userEmail: "required|email",
    userPassword: "required",
  };
  const validation = new Validator(requestBody, validationRule);
  if (validation.fails()) {
    return res.status(400).json({
      error: "Validation_failed",
      message: validation.errors.all(),
    });
  }

  const user = await UserModel.findOne({ userEmail: requestBody.userEmail });
  if (!user) {
    return res.status(400).json({
      error: "Email_not_found",
      message: "Email not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(
    requestBody.userPassword,
    user.userPassword
  );

  if (!isPasswordValid) {
    console.log("wrong pw");
    return res.status(400).json({
      error: "Wrong_Password",
      message: "Wrong Password",
    });
  }
  const token = await createTokenPromise(
    { _id: user._id },
    config.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: config.JWT_ACCESS_TOKEN_EXPIRE,
    }
  );

  return res.json({
    message: "User Logged in successfully",
    token,
    user,
  });
};
export const GETAdminDetail = async (req, res) => {
  const user = req.user;
  const admin = await UserModel.findById({ _id: user._id });
  if (!admin) {
    res.status(400).json({
      message: "Unauthorized user",
    });
  } else {
    res.json({
      message: "Data Found successfully",
      admin,
    });
  }
};

export const POSTUpdateProfile = async (req, res) => {
  const requestBody = req.body;
  const user = req.user;
  let updatevalidationRule = {
    userEmail: "email",
  };

  let updatevalidation = new Validator(requestBody, updatevalidationRule);

  if (updatevalidation.fails()) {
    return res.status(400).json({
      error: "Invalid email address..",
      message: updatevalidation.errors.all(),
    });
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: user._id },
    requestBody
  );
  updatedUser
    .then((data) => {
      res.status(200).json({
        message: "User Updated Successfully",
        data: data,
      });
    })
    .catch((err) => {
      message: "Error ocured during updating user";
      error: err;
    });
};

export const POSTAddBrand = async (req, res) => {
  const requestBody = req.body;

  const brandValidationRule = {
    brandName: "required",
  };

  let brandValidation = new Validator(requestBody, brandValidationRule);
  if (brandValidation.fails()) {
    return res.status(400).json({
      error: "Brand validation failed",
      message: brandValidation.errors.all(),
    });
  }
  if (req.user.role != "admin") {
    return res.status(400).json({
      error: "Only admins can add Brands",
    });
  }

  const newBrand = await BrandModel.create({
    brandName: requestBody.brandName,
    admin_id: req.user._id,
  });
  return res.json({
    message: "Brand Added successfully",
    brand_id: newBrand._id,
  });
};
export const POSTUpdateBrand = async (req, res) => {
  const requestBody = req.body;
  const id = req.params.id;
  console.log("request body ... ", requestBody);
  console.log("brand id...", id);
  console.log("admin_id...", req.user._id);
  const brandValidationRule = {
    brandName: "required",
  };
  let brandValidation = new Validator(requestBody, brandValidationRule);
  if (brandValidation.fails()) {
    return res.status(400).json({
      error: "Brand validation failed",
      message: brandValidation.errors.all(),
    });
  }
  if (req.user.role != "admin") {
    return res.status(400).json({
      error: "Only admins can add Brands",
    });
  }
  const updatebrand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { brandName: requestBody.brandName, admin_id: req.user._id }
  )
    .then((data) => {
      res.status(200).json({
        message: "Brand Updated Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: "Something went wrong...!!",
      });
    });
};
export const GETAllBrands = async (req, res) => {
  const getallbrands = await BrandModel.find().then((data) => {
    res.status(200).json({
      message: "Brands found successfully",
      data,
    });
  });
};
export const GETBrandById = async (req, res) => {
  const id = req.params.id;
  let GETBrandById = await BrandModel.findById(id).then((brand) => {
    res.status(200).json({
      brand: brand,
    });
  });
};
export const POSTAddCategory = async (req, res) => {
  const requestBody = req.body;
  const categoryValidationRule = {
    category_name: "required",
  };

  let categoryValidation = new Validator(requestBody, categoryValidationRule);
  if (categoryValidation.fails()) {
    return res.status(400).json({
      error: "Category validation failed",
      message: categoryValidation.errors.all(),
    });
  }
  if (req.user.role != "admin") {
    return res.status(400).json({
      error: "Only admins can add Brands",
    });
  }
  const newCategory = await CategoryModel.create({
    category_name: req.body.category_name,
    admin_id: req.user._id,
  });
  return res.json({
    message: "Category created successfully",
    user_id: newCategory._id,
  });
};
export const GETAllCategories = async (req, res) => {
  const getallcategories = await CategoryModel.find().then((data) => {
    res.status(200).json({
      message: "Categories found successfully...!!",
      data,
    });
  });
};
export const GETCategoryById = async (req, res) => {
  const id = req.params.id;
  console.log("id : ", id);
  let getcategorybyid = await CategoryModel.findById(id).then((category) => {
    res.status(200).json({
      category: category,
    });
  });
};
export const POSTUpdateCategory = async (req, res) => {
  const requestBody = req.body;
  const id = req.params.id;
  const admin = req.user;
  // console.log("requestBody:...", requestBody);
  // console.log("id : ", id);
  // console.log("admin... ", admin);
  const categoryValidationRule = {
    category_name: "required",
  };
  let categoryValidation = new Validator(requestBody, categoryValidationRule);
  if (categoryValidation.fails()) {
    return res.status(400).json({
      error: "Category validation failed",
      message: categoryValidation.errors.all(),
    });
  }
  if (admin.role != "admin") {
    console.log("user...", admin.role);
    return res.status(400).json({
      error: "Only admins can update category",
    });
  }

  const updatecategory = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { category_name: requestBody.category_name, admin_id: req.user._id }
  ).then((data) => {
    res.status(200).json({
      message: "category Updated Successfully",
      data: data,
    });
  });
};
export const POSTAddSubCategory = async (req, res) => {
  const requestBody = req.body;
  const user = req.user;
  let validationRule = {
    subcat_name: "required",
    cat_id: "required",
  };
  let subcategoryValidation = new Validator(requestBody, validationRule);
  if (subcategoryValidation.fails()) {
    return res.status(400).json({
      error: "validation failed",
      message: validation.errors.all(),
    });
  }
  if (user.role != "admin") {
    return res.status(400).json({
      error: "Only admins can add sub category",
    });
  }
  const newSubCat = await SubCatModel.create({
    subcat_name: requestBody.subcat_name,
    cat_id: requestBody.cat_id,
    admin_id: user._id,
  });
  return res.json({
    message: "Sub Category created successfully",
    newsubcat: newSubCat,
  });
};

export const GETAllSubCategories = async (req, res) => {
  const GETAllSubCategories = await SubCatModel.find().then((data) => {
    res.status(200).json({
      message: "Sub categories found successfully...!!",
      data,
    });
  });
};

export const GETSubCatById = async (req, res) => {
  const id = req.params.id;
  console.log("id...", id);
  let getsubcatbyid = await SubCatModel.findById(id)
    .populate("cat_id")
    .exec()
    .then((subcat) => {
      res.status(200).json({
        subcategory: subcat,
      });
    });
};

export const POSTUpdateSubCat = async (req, res) => {
  const requestBody = req.body;
  const id = req.params.id;
  const admin = req.user;

  let validationRule = {
    subcat_name: "required",
    cat_id: "required",
  };
  let subcategoryValidation = new Validator(requestBody, validationRule);
  if (subcategoryValidation.fails()) {
    return res.status(400).json({
      error: "validation failed",
      message: validation.errors.all(),
    });
  }
  if (admin.role != "admin") {
    return res.status(400).json({
      error: "Only admins can add sub category",
    });
  }
  const updatesubcategory = await SubCatModel.findOneAndUpdate(
    { _id: id },
    {
      subcat_name: requestBody.subcat_name,
      cat_id: requestBody.cat_id,
    }
  ).then((data) => {
    res.status(200).json({
      message: "Sub category Updated Successfully",
      data: data,
    });
  });
};

export const POSTAddColor = async (req, res) => {
  const requestBody = req.body;
  const colorValidationRule = {
    product_color: "required",
  };

  const colorValidation = new Validator(requestBody, colorValidationRule);
  if (colorValidation.fails()) {
    return res.status(400).json({
      error: "Color validation failed",
      message: colorValidation.errors.all(),
    });
  }

  const newColor = await ColorModel.create({
    product_color: requestBody.product_color,
  });
  return res.json({
    message: "Color Added successfully",
    color: newColor,
  });
};

export const GETAllColors = async (req, res) => {
  const getallcolors = await ColorModel.find().then((colors) => {
    res.status(200).json({
      message: "All colors found...",
      colors: colors,
    });
  });
};

export const GETColorById = async (req, res) => {
  const id = req.params.id;
  let colorbyid = await ColorModel.findById(id)
    .then((color) => {
      res.status(200).json({
        color: color,
      });
    })
    .catch((err) => {
      error: err;
    });
};
export const POSTUpdateColor = async (req, res) => {
  const id = req.params.id;
  const requestBody = req.body;
  const colorValidationRule = {
    product_color: "required",
  };

  const colorValidation = new Validator(requestBody, colorValidationRule);
  if (colorValidation.fails()) {
    return res.status(400).json({
      error: "Color validation failed",
      message: colorValidation.errors.all(),
    });
  }
  const updateColor = await ColorModel.findOneAndUpdate(
    { _id: id },
    { product_color: requestBody.product_color }
  )
    .then((color) => {
      res.status(200).json({
        message: "Color Updated Successfully",
        color: color,
      });
    })
    .catch((err) => {
      res.status(403).json({
        error: err,
      });
    });
};
export const POSTAddProduct = async (req, res) => {
  // console.log("files :... ", req.files);
  // console.log("colors:....", req.body.colors);
  // console.log("type ...", typeof req.body.colors);
  const requestBody = req.body;
  const requestFile = req.files;
  let images = [];
  for (let i = 0; i < requestFile.length; i++) {
    images[i] = requestFile[0].path;
  }
  if (images == []) {
    return res.status(400).json({
      message: "Please Upload Images",
    });
  }

  let productValidationRules = {
    product_name: "required",
    product_price: "required",
    avail_mtr: "required",
    is_avail: "required",
    hsn_code: "required",
    colors: "required",
    brand_id: "required",
    subcat_id: "required",
  };
  let productValidation = new Validator(requestBody, productValidationRules);
  if (productValidation.fails()) {
    return res.status(400).json({
      error: "product validation failed",
      message: productValidation.errors.all(),
    });
  }

  let newProduct = await ProductModel.create(requestBody)
    // ({
    //   product_name: requestBody.product_name,
    //   product_price: requestBody.product_price,
    //   discount_rate: requestBody.discount_rate,
    //   avail_mtr: requestBody.avail_mtr,
    //   is_avail: requestBody.is_avail,
    //   cgst_rate: requestBody.cgst_rate,
    //   sgst_rate: requestBody.sgst_rate,
    //   igst_rate: requestBody.igst_rate,
    //   images: images,
    //   hsn_code: requestBody.hsn_code,
    //   colors: requestBody.colors,
    //   product_desc: requestBody.product_desc,
    //   brand_id: requestBody.brand_id,
    //   subcat_id: requestBody.subcat_id,
    // })
    .then((product) => {
      res.status(200).json({
        message: "Product Added successfully",
        product: product,
      });
    })
    .catch((err) => {
      res.json(400).json({
        message: "Something went wrong...!!",
        error: err,
      });
    });
};

export const GETAllProducts = async (req, res) => {
  const getallProducts = await ProductModel.find()
    .populate("brand_id")
    .populate({ path: "subcat_id", populate: { path: "cat_id" } })
    .exec()
    .then((products) => {
      res.status(200).json({
        message: "All Product...",
        products: products,
      });
    });
};
export const GETProductById = async (req, res) => {
  const id = req.params.id;
  let productbyid = await ProductModel.findOne({ _id: id })
    .populate("brand_id")
    .populate({ path: "subcat_id", populate: { path: "cat_id" } })
    .exec()
    .then((product) => {
      res.status(200).json({
        message: "Product..",
        product: product,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Unable to get product",
        error: err,
      });
    });
};
export const POSTUpdateProduct = async (req, res) => {
  let id = req.params.id;
  let requestBody = req.body;
  let user = req.user;

  let productValidationRules = {
    product_name: "required",
    product_price: "required",
    // avail_mtr: "required",
    is_avail: "required",
    hsn_code: "required",
    colors: "required",
    brand_id: "required",
    subcat_id: "required",
  };
  let productValidation = new Validator(requestBody, productValidationRules);
  if (productValidation.fails()) {
    return res.status(400).json({
      error: "product validation failed",
      message: productValidation.errors.all(),
    });
  }
  if (user.role != "admin") {
    return res.status(400).json({
      error: "Only admins can update Product",
    });
  }
  let updateproduct = await ProductModel.findOneAndUpdate(
    { _id: id },
    requestBody
  )
    .then((product) => {
      res.status(200).json({
        message: "Product updated successfully...",
        product: product,
      });
    })
    .catch((err) => {
      res.status(403).json((err) => {
        error: err;
      });
    });
};

//get all order details from order model
const GETAllOrders = async (req, res) => {
  const getallorders = await OrderModel.find().then((orders) => {
    res.status(200).json({
      message: "All Orders...",
      orders: orders,
    });
  });
};
//get order details by id from order model
const GETOrderById = async (req, res) => {
  const id = req.params.id;
  const getorderbyid = await OrderModel.findById(id).then((order) => {
    res.status(200).json({
      message: "Order...",
      order: order,
    });
  });
};
//update order details by id from order model
export const POSTUpdateOrder = async (req, res) => {
  const _id = req.params.id;
  const requestBody = req.body;
  const user = req.user;  //user is admin 
  console.log("request body...", requestBody);
  console.log("user...", user);
  let updatevalidationRule = {
    status: "required",
  };  
  let updatevalidation = new Validator(requestBody, updatevalidationRule);
  if (updatevalidation.fails()) {
    return res.status(400).json({
      error: "Invalid status..",
      message: updatevalidation.errors.all(),
    });
  }
  if (user.role != "admin") {
    return res.status(400).json({
      error: "Only admins can update order",
    });
  }
  // update the data from requestBody
  const updateorder = await OrderModel.findOneAndUpdate(_id, requestBody);
  updateorder
    .then((data) => {
      res.status(200).json({
        message: "Order Updated Successfully",
        data: data,
      });
    })
    .catch((err) => {
      message: "Error ocured during updating order";
      error: err;
    });

}
