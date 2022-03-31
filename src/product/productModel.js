import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config";

class Product extends Model {}
Product.init(
  {
    name: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Product",
    paranoid: true,
  }
);

export default Product;
