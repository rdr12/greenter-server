const router = require("express").Router();
const PlantaModel = require("../models/Planta.model.js");
const isAuthenticated = require("../middlewares/isAuthenticated");
const ComentariosModel = require("../models/Comentarios.model");
// const uploader = require("../middlewares/cloudinary")

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
router.post("/plantaAdd", isAuthenticated, async (req, res, next) => {
  const {
    nombre,
    description,
    parteUtilizada,
    habitatRecoleccion,
    principiosActivos,
    empleo
    
    } = req.body;

    

  try {

    const plantaEncontrada = await PlantaModel.findOne({nombre})
    if (plantaEncontrada !==null) {
      res.status(400).json({errorMessage:"Ya existe una planta con ese nombre"})
      return;
    }
    const response = await PlantaModel.create({
      nombre,
      description,
      parteUtilizada,
      habitatRecoleccion,
      principiosActivos,
      empleo,
      // image:req.file.path
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
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    await PlantaModel.findByIdAndDelete(id);
    res.json("Tu planta ha sido borrada");
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/plantas/:id" => editar
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const {
    nombre,
    description,
    parteUtilizada,
    habitatRecoleccion,
    principiosActivos,
    empleo,
    // image,
  } = req.body;
  //CLAUSULAS DE GUARDIA (si estos campos no existen le enviamos al front end algo que diga que todos los campos tienen que estar llenos)
  //   if (
  //     !nombre ||
  //     !description ||
  //     !parteUtilizada ||
  //     !habitatRecoleccion ||
  //     !principiosActivos ||
  //     !empleo,
  //     !image
  //   ) {
  //     res.status(403).json("Para poder continuar debes rellenar todos los campos");
  //   }
  try {
    await PlantaModel.findByIdAndUpdate(id, {
      nombre,
      description,
      parteUtilizada,
      habitatRecoleccion,
      principiosActivos,
      empleo,
      // image
    });
    res.json("La información ha sido actualizada");
  } catch (error) {
    next(error);
  }
});






//GET "/api/plantas/:id/comentarios" => para ver los comentarios ¡¡POPULATE!! RELACIÓN CON USERMODEL
router.get("/:id/comentarios", async (req, res, next) => {
 
  console.log("esto es un id", id)
  try {
    const response = await ComentariosModel.find().populate("user");
    res.json(response);
    
  } catch (error) {
    next(error);
  }
});

//POST "/api/plantas/:id" => añadir comentarios
router.post("/:id", isAuthenticated, async (req, res, next) => {
  const user = req.payload._id;
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400).json({
      errorMessage: "Por favor, rellene todos los campos para continuar",
    });
    return;
  }

  try {
    const response = await ComentariosModel.create({ user, planta: id, text });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// //DELETE "/api/plantas/:idComentarios/borrar-comentario" => borrar comentarios
// router.delete("/:id/comentarios/borrar-comentario", async (req, res, next) => {
//   const { idComentario } = req.params;
//   try {
//     await ComentariosModel.findByIdAndDelete(idComentario);
//     res.json("Comentario borrado");
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
