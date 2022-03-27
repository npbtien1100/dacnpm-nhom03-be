import Product from "./productModel";
import BaseSevice from "../../base/BaseService";
import autoBind from "auto-bind";

class ProductService extends BaseSevice {
  constructor() {
    super(Product);
    autoBind(this);
  }
}

export default ProductService;
