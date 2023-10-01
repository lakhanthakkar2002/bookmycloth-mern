import { json } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "F:\\BookMYCloth\\backend\\singleImage", (err, success) => {
      if (err) {
        throw err;
      }
    });
  },
  filename: (req, file, cb) => {
    file.originalname + "_" + Date.now();
    cb(nul, name, (error, success) => {
      if (error) {
        throw error;
      }
    });
  },
});

export default multer({ dest: "/singleImage", storage: storage });
