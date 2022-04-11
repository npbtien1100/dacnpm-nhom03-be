import express from "express";
import { customAuthenticateByJwt } from "../auth/auth.services";
const router = express.Router();
import AdminController from "./adminController";

router.post("/login", AdminController.handleLogin);

router.get(
  "/total-report",
  customAuthenticateByJwt,
  AdminController.getTotalReport
);

//admin API
router.get("/", customAuthenticateByJwt, AdminController.getAllAdmins);
router.post("/", AdminController.createAnAdmin);
router.get("/:adminId", customAuthenticateByJwt, AdminController.getAnAdmin);
router.put("/:adminId", customAuthenticateByJwt, AdminController.updateAnAdmin);

export default router;
