// const router = require("express").Router();
// const fileUploader = require("../middlewares/uploader.js");

// // SUBE IMAGEN EN PERFIL
// router.post("/", fileUploader.single("image"), (req, res, next) => {
//   if (!req.file) {
//     next(new Error("No se ha podido subir la imagen"));
//     return;
//   }
//   //   console.log("intentando enviar imagen");
//   //   console.log("el archivo recibido de cloudinary", req.file);
//   //aqui es donde vamos a usar el paquete de cloudinary

//   res.json({fileIm: req.file.path});
// });

// module.exports = router;
