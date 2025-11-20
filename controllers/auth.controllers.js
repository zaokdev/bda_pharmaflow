import { models } from "../db/mysql.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    // Validación básica
    if (!usuario || !password) {
      return res.status(400).json({ mensaje: "Faltan usuario o contraseña" });
    }

    // Buscar usuario en MySQL
    const userFound = await models.usuarios.findOne({
      where: { usuario },
    });

    if (!userFound) {
      return res.status(404).json({ mensaje: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(password, userFound.password);
    if (!validPassword) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    req.session.user = {
      id: userFound.id,
      usuario: userFound.usuario,
      id_rol: userFound.id_rol,
      nombre_completo: userFound.nombre_completo,
    };

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ mensaje: "Error al crear la sesión" });
      }

      // 5. Responder al Front
      // NO mandas token. Solo dices "OK". La cookie va en los headers sola.
      res.status(200).json({
        mensaje: "Login exitoso",
        usuario: req.session.user,
      });
    });
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
  }
};
export const createUser = async (req, res) => {
  try {
    const { usuario, nombre_completo, password, id_rol } = req.body;
    if (
      !req.body.usuario ||
      !req.body.nombre_completo ||
      !req.body.password ||
      !req.body.id_rol
    ) {
      return res.status(400).json({ mensaje: "Faltan datos" });
    }

    //Verificacion de existencia
    const userExists = await models.usuarios.findOne({
      where: {
        usuario,
      },
    });

    if (userExists) {
      return res.status(400).json({ mensaje: "Usuario ya existe" });
    }

    //hash de password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    //Crear el usuario
    const user = await models.usuarios.create({
      usuario,
      nombre_completo,
      password: passwordHashed,
      id_rol,
    });

    if (user) {
      return res.status(201).json({ mensaje: "Usuario creado" });
    }

    throw new Error("Error al crear usuario");
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
  }
};
