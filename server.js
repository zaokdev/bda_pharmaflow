import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import inventarioRoutes from "./routes/inventario.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
import { sessionConfig as sessionMiddleware } from "./middleware/sessionMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(sessionMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/stock", inventarioRoutes);
app.use("/api/venta", ventaRoutes);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
