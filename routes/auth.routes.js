import { Router } from "express";
import { loginUser, createUser } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/iniciar-sesion", loginUser);
router.post("/crear-usuario", createUser);

export default router;
