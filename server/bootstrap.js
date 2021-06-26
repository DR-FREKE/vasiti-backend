import Seller from "./model/Seller";
import Product from "./model/Product";

const bootstrap = async () => {
  Seller.hasMany(Product, { as: "Products", foreignKey: "seller_id" });
  Product.belongsTo(Seller, { as: "Seller", foreignKey: "seller_id" });

  // this code should go into the seeder file
  const errHandler = (err) => {
    console.log("Error: ", err);
  };

  try {
    const seller = await Seller.create({ seller_name: "Olatunji" });
    const product = await Product.create({
      product_name: "Shoe",
      product_description: "some description",
      show: true,
      seller_id: seller.id,
      product_varieties: {
        size: "32",
        color: "orange",
        quantity: "15",
        images: [],
        price: "23000",
      },
    });
  } catch (error) {
    errHandler(error);
  }
};

export default bootstrap;
