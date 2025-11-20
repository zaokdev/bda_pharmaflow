import { Router } from "express";
import { sellMeds } from "../controllers/venta.controllers.js";
import { roleProtect } from "../middleware/roleProtectMiddleware.js";

const router = Router();

router.post("/", roleProtect([1, 2]), sellMeds);

export default router;
