import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { sessionConfig as sessionMiddleware } from "./middleware/sessionMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(sessionMiddleware);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
