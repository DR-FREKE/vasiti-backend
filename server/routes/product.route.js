import "babel-polyfill";
import { Router } from "express";
import {
  addProduct,
  updateProduct,
  editProductVariant,
  getProductById,
  getAllProduct,
} from "../controller/product.controller";

//initialize route here
const route = Router();

route.get("/product", getAllProduct);
route.get("/product/:product_id", getProductById);
route.post("/product", addProduct);
route.patch("/product/:product_id/:variant_id", editProductVariant);
route.put("/product/:product_id", updateProduct);
// route.delete()

export default route;
