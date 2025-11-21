import { Router } from "express";
import { sellMeds, getSalesHistory } from "../controllers/venta.controllers.js";
import { roleProtect } from "../middleware/roleProtectMiddleware.js";

const router = Router();

router.post("/", roleProtect([1, 2]), sellMeds);
router.get("/", roleProtect([1, 2]), getSalesHistory);

export default router;
