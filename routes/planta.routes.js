const router = require("express").Router();
const PlantaModel = require("../models/Planta.model.js");
// const isAuthenticated = require("../middlewares/isAuthenticated")

//CRUD

// GET "/api/plantas" => listado de plantas (por nombre)
router.get("/", async (req, res, next) => {
  try {
    const response = await PlantaModel.find().select("nombre");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//POST "api/plantas" => creamos una Planta nueva
router.post("/", async (req, res, next) => {
  const {
    nombre,
    description,
    parteUtilizada,
    habitatRecoleccion,
    principiosActivos,
    empleo,
  } = req.body;

  try {
    const response = await PlantaModel.create({
      nombre,
      description,
      parteUtilizada,
      habitatRecoleccion,
      principiosActivos,
      empleo,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/api/plantas/:id" => detalles
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await PlantaModel.findById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/plantas/:id" => borrar
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await PlantaModel.findByIdAndDelete(id);
    res.json("Tu planta ha sido borrada");
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/plantas/:id" => editar
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    nombre,
    description,
    parteUtilizada,
    habitatRecoleccion,
    principiosActivos,
    empleo,
  } = req.body;

//   if (
//     !nombre ||
//     !description ||
//     !parteUtilizada ||
//     !habitatRecoleccion ||
//     !principiosActivos ||
//     !empleo
//   ) {
//     res.status(400).json("Para continuar debes rellenar todos los campos");
//   }
  try {
    await PlantaModel.findByIdAndUpdate(id, {
      nombre,
      description,
      parteUtilizada,
      habitatRecoleccion,
      principiosActivos,
      empleo,
    });
    res.json("La información ha sido actualizada");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
