/**
 * Proteccion por roles
 * 1 - Gerente
 * 2 - Farmaceutico
 * 3 - Investigador
 * @param {number[]} rol
 */
export const roleProtect = (roles) => {
  return (req, res, next) => {
    roles = Array.isArray(roles) ? roles : [roles];

    if (!req.session.user) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const { id_rol } = req.session.user;

    if (roles.includes(id_rol)) {
      next();
    } else {
      return res.status(403).json({ mensaje: "Acceso denegado" });
    }
  };
};
