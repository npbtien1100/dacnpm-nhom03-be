import ProductService from "./productSevice";
import BaseController from "../../base/BaseController";

const productSevice = new ProductService();

import autoBind from "auto-bind";

class ProductController extends BaseController {
  constructor() {
    super(productSevice);
    autoBind(this);
  }
  async test(req, res, next) {
    try {
      console.log(this);
      /*  #swagger.tags = ['TST']
          #swagger.description = 'Endpoint testing' */
      const response = {
        name: "aylmao",
      };
      /* #swagger.responses[200] = {
                schema: { "$ref": "#/definitions/tst" },
                description: "TST successfully." } */
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default new ProductController();
