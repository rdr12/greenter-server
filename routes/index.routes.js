const router = require("express").Router();
// const isAuthenticated = require("../middlewares/isAuthenticated");


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
//RUTA AUTH Cast to ObjectId failed for value
const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

//RUTA PLANTA
const plantaRoutes = require("./planta.routes.js")
router.use("/plantas", plantaRoutes)

// RUTA PROFILE
const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)

//RUTA CLOUDINARY
const uploaderRoutes = require("./uploader.routes")
router.use("/uploader", uploaderRoutes)








module.exports = router;
