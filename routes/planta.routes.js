const router = require("express").Router();
const PlantaModel = require("../models/Planta.model")

// GET "/api/plantas" => listado de plantas
router.get("/", async (req, res, next) => {

    try {

        const response = await PlantaModel.find().select("name")

        res.json(response)

    }catch (error) {

        next(error)
    }
   

})

module.exports = router;