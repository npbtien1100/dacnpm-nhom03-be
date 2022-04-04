import express from "express";
const router = express.Router();
import AdminController from "./adminController";
// import { authenticateByJwt } from "../auth/auth.services";

router.post("/register", AdminController.register);
router.post("/login", AdminController.login)

// router.get("/", AdminController.getAll);
// router.get("/:id", AdminController.get);
// router.put("/:id", AdminController.update);
// router.delete("/:id", AdminController.delete);

export default router;