import multer from "multer";
import Datauri from "datauri/parser"; //to convert the buffer to actual string
import path from "path";

const storage = multer.memoryStorage();

const filterImage = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("file type is wrong"), false);
  }
};

const multeruploads = multer({
  storage,
}).single("product_image");

const dUri = new Datauri();

const dataUri = (req) =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { multeruploads, dataUri };
