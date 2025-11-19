import { models } from "../db/mysql.js";

export const loginUser = () => {};
export const createUser = async (req, res) => {
  const papu = await models.usuarios.findAll();
  res.json(papu), 200;
};
