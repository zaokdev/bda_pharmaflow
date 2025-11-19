import { Sequelize } from "sequelize";
import initModels from "../models/init-models.js"; // Importamos el cargador automático

// 1. Configuración de la conexión
// IMPORTANTE: Reemplaza los datos con los mismos que usaste en el comando npx
const sequelize = new Sequelize("pharmaflow_db", "admin", "adminpass", {
  host: "localhost",
  dialect: "mysql",
  logging: true, // Ponlo en true si quieres ver los SELECT/INSERT en la consola
});

// 2. Cargar los modelos
// initModels recibe la conexión y devuelve un objeto con todas tus tablas
const models = initModels(sequelize);

// 3. Exportar la conexión (sequelize) y los modelos (models)
export { sequelize, models };
