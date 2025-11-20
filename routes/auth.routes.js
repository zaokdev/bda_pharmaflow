import { Router } from "express";
import { loginUser, createUser } from "../controllers/auth.controllers.js";
import { roleProtect } from "../middleware/roleProtectMiddleware.js";

const router = Router();

router.post("/iniciar-sesion", loginUser);
router.post("/crear-usuario", roleProtect([1]), createUser);

export default router;
