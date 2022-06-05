//ACCESO DE ADMINISTRADOR
const isAdmin = (req, res, next) => {
  if (req.payload.role === "admin") {
    next();
  } else {
    res.status(401).json({
      errorMessage:
        "No tienes permiso para navegar a esta ruta. Inicia sesión como administrador para continuar.",
    });
  }
};

module.exports = isAdmin;
