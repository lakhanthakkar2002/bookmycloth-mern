// import Validator from "validatorjs";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import config from "../configs/globle.conf.js";

const verifyTokenPromise = (token, key, options) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, options, (err, payload) => {
      // console.log("err : ", err);
      // console.log("token inside verify : ", token);
      if (err) reject(err);
      resolve(payload);

    });
  });
};

export default async (req, res, next) => {
  const { token } = req.headers;
  // console.log("token : ", token);
  if (!token) return res.status(401).json({ error: "Token is not provided" });
  try {
    const payload = await verifyTokenPromise(
      token,
      config.JWT_ACCESS_TOKEN_SECRET,
      {
        ignoreExpiration: false,
      }
    );
    
    
    // console.log("payload...", payload._id);
    const user = await UserModel.findOne({ _id: payload._id });
    // console.log("user...", user);
    if (!user) return res.status(403).json({ error: "Invalid Token..." });
    // console.log("req...", req);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};
