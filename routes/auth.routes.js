const router = require("express").Router();
const UserModel = require("../models/User.model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

//RUTAS//

// POST "/api/auth/signup" => registrar un usuario
router.post("/signup", async (req, res, next) => {
  const { email, password, username } = req.body;

  // Validaciones de backend
  if (!email || !password || !username) {
    res.status(400).json({
      errorMessage: "Por favor, rellena todos los campos para continuar",
    });
    return;
  }

  try {
    //CHEQUEAR POR EMAIL
    const foundUserEmail = await UserModel.findOne({ email });
    if (foundUserEmail !== null) {
      res.status(400).json({ errorMessage: "Este email ya está registrado" });
      return;
    }

    //CHEKEAR POR USUARIO
    const foundUserUser = await UserModel.findOne({ username });
    if (foundUserUser !== null) {
      res.status(400).json({ errorMessage: "Este usuario ya existe" });
      return;
    }

    //ENCRIPTACIÓN DE PASSWORD
    const salt = await bcryptjs.genSalt(12);
    const hashPassword = await bcryptjs.hash(password, salt);

    //CREAR UN NUEVO USUARIO
    await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(201).json("El usuario se ha registrado correctamente");
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" => verificar las credenciales del usuario y abrirle "sesion"
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //chequea que el email y está registrado y busca usuario
    const foundUser = await UserModel.findOne({ email });
    if (foundUser === null) {
      res.status(400).json({
        errorMessage: "Dirección de correo electrónico no registrada",
      });
      return;
    }

    // el usuario ha sido validado
    const passwordMatch = await bcryptjs.compare(password, foundUser.password);
    console.log(passwordMatch); // true o false

    if (passwordMatch === false) {
      res.status(401).json({ errorMessage: "Contraseña incorrecta" });
      return;
    }

    //CREAR Y ENVIAR TOKEN
    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      role: foundUser.role, // ¡¡¿¿??ó isAdmin?
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" => checkea que el token es valido, y el rol del admin
router.get("/verify", isAuthenticated, (req, res, next) => {
  const adminRole = req.payload.role;
  res.status(200).json({ adminRole });
});

module.exports = router;
