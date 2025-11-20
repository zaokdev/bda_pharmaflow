import { Router } from "express";
import {
  crearEnsayo,
  obtenerTodosLosEnsayos,
} from "../controllers/ensayos.controllers.js";
import { roleProtect } from "../middleware/roleProtectMiddleware.js";

const router = Router();

router.get("/", roleProtect([1, 3]), obtenerTodosLosEnsayos);
router.post("/", roleProtect([1, 3]), crearEnsayo);

export default router;
