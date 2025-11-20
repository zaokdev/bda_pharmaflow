import { Router } from "express";
import {
  getStock,
  addMedicine,
} from "../controllers/inventario.controllers.js";
import { roleProtect } from "../middleware/roleProtectMiddleware.js";

const router = Router();

router.get("/", roleProtect([1, 2]), getStock);
router.post("/", roleProtect([1]), addMedicine);

export default router;
