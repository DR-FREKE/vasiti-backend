import {
  validateProduct,
  validateUpdateProduct,
} from "../../config/validation";
import Product from "../model/Product";
import Seller from "../model/Seller";
import { randomBytes } from "crypto";
import { uploader } from "../../config/cloudinary.config";
import { dataUri } from "../middleware/file.middleware";

//

// method to add a product
export const addProduct = async (req, res) => {
  // get data as req.body
  const data = req.body;

  try {
    // get validation error
    const { error } = validateProduct(data);
    if (error) throw new Error(error);

    // if all is good
    data.product_varieties.forEach((item) => {
      // generate id for variants
      const variant_id = randomBytes(4).toString("hex");

      return (item.id = variant_id);
    });
    const product = await Product.create(data);
    if (product) res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// method to edit a product variant
export const editProductVariant = async (req, res) => {
  //get the product and the product variant that should change
  const { product_id, variant_id } = req.params;
  let product;

  // get the data that should change
  const data = req.body;

  try {
    const { product_variant, variant_index } = await getProductVariant(
      product_id,
      variant_id
    );

    // merge the data passed to the previous product variant
    product_variant[variant_index] = {
      ...product_variant[variant_index],
      ...data,
    };

    // run query to update product varieties
    const updated_product = await Product.update(
      { product_varieties: product_variant },
      {
        where: { id: product_id },
      }
    );

    if (!updated_product) throw new Error("could not update field");

    product = await getProduct(product_id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// method to update a product
export const updateProduct = async (req, res) => {
  // get the product id that should be updated
  const { product_id } = req.params;
  let product; // declare varaible to hold product

  //get the data to update the table
  const data = req.body;

  try {
    // get validation error
    const { error } = validateUpdateProduct(data);
    if (error) throw new Error(error);

    // check then get product if it exist
    const update_product = await Product.update(data, {
      where: { id: product_id },
    });

    if (!update_product) throw new Error("product not found");

    product = await getProduct(product_id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { product_id } = req.params;

  try {
    const product = await getProduct(product_id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const all_product = await Product.findAll({
      include: [{ model: Seller, as: "Seller" }],
    });

    if (all_product.length < 1) throw new Error("no product available");

    res.status(200).json({ success: true, data: all_product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getProduct = async (id) => {
  //query data from db
  const product = await Product.findOne({
    where: { id },
  });

  if (!product) throw new Error("not found");

  return product;
};

const getProductVariant = async (product_id, variant_id) => {
  const product = await getProduct(product_id);
  //get the product_varieties
  const product_variant = JSON.parse(product.product_varieties);
  let variant_index = product_variant.findIndex(
    (content) => content.id == variant_id
  );
  if (variant_index < 0) throw new Error("variant with id not found");

  return { product_variant, variant_index };
};

export const uploadProductImage = async (req, res) => {
  //
  try {
    if (req.file) {
      const files = dataUri(req).content;

      const upload_file = await uploader.upload(files);
      let image = upload_file.url;

      res.status(200).json({
        messge: "Your image has been uploded successfully to cloudinary",
        data: { image },
      });
    }
  } catch (error) {
    res.status(400).json({
      messge: "someting went wrong while processing your request",
      data: { error },
    });
  }
};
