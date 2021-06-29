import "babel-polyfill";
import { Router } from "express";
import {
  addProduct,
  updateProduct,
  editProductVariant,
  getProductById,
  getAllProduct,
  uploadProductImage,
} from "../controller/product.controller";
import { multeruploads } from "../middleware/file.middleware";

//initialize route here
const route = Router();

route.get("/product", getAllProduct);
route.get("/product/:product_id", getProductById);
route.post("/product", addProduct);
route.patch("/product/:product_id/:variant_id", editProductVariant);
route.put("/product/:product_id", updateProduct);
// route.delete()
route.post("/upload", multeruploads, uploadProductImage);

export default route;
