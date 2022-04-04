import AdminService from "./adminService";
import BaseController from "../../base/BaseController";
import autoBind from "auto-bind";

import { registerValidate } from "./adminValidate";

import { validPassword, hashPassword, makeCode } from "../../helper/Utility";
import jwt from "jsonwebtoken";
import HttpResponse from "../../helper/HttpResponse";

const adminService = new AdminService();

class AdminController extends BaseController {
  constructor() {
    super(adminService);
    autoBind(this);
  }

  async register(req, res, next) {
    try {
      //Validate Registers
      let data = req.body;
      const validated = registerValidate(data);
      if (validated.error != null)
        return res.status(400).json({
          error: true,
          message: validated.error.details[0].message,
        });

      //Check Confirm Password
      if (data.password != data.confirmPassword) {
        return res.status(400).json({
          error: true,
          message: "Confirm password is incorrect.",
        });
      }

      //Check Email Exist
      const checkEmailResult = await this.service.findOneByEmail(data.email);
      if (checkEmailResult != null) {
        return res.status(400).json({
          error: true,
          message: "Email has already registered",
        });
      }
      //HashPassword
      const password = data.password;
      data.password = await hashPassword(password);

      //Create key and Send Mail
      // data.code = makeCode(26);

      //Register new Admin
      const result = await this.service.registerAdmin(data);
      if (result.error) {
        res.status(500).send({
          message: result.error,
        });
        return;
      }

      return res.status(200).json({
        error: false,
        message: result,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const data = req.body;
      //console.log(req.body);
      //Find Admin In DB
      const admin = await this.service.findOneByEmail(data.email);
      // console.log(admin);
      if (!admin) {
        return res.status(400).json({
          error: true,
          message: "The email you entered is not registered.",
        });
      }
      //Check Register type
      if (admin.registerType == "socialLinked") {
        return res.status(400).json({
          error: true,
          message: "Please login with your social account.",
        });
      }
      //Check Password
      // console.log("Password " + admin.password);
      const isValid = await validPassword(data.password, admin.password);
      if (!isValid) {
        return res.status(400).json({
          error: true,
          message: "The password you entered is not correct",
        });
      }
      //Check is verified, is lock
      // const isVerified = admin.isVerify === true;
      // if (!isVerified) {
      //   return res.status(400).json({
      //     error: true,
      //     message: "Your email isn't verified. Please confirm your email.",
      //   });
      // }
      // const isLocked = admin.isLock === true;
      // if (isLocked) {
      //   return res.status(400).json({
      //     error: true,
      //     message: "Your account is locked.",
      //   });
      // }
      //JWT
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: 10000000,
      });
      //res.header("auth-token", token).send(token);

      // const tokenObject = Util.issueJWT(admin);
      return res.status(200).json(
        new HttpResponse({
          id: admin.id,
          token: token,
          expiresIn: 10000000,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AdminController();