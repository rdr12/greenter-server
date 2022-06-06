//MODELO DE PLANTA
const { Schema, model } = require("mongoose");

const plantaSchema = new Schema({
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  nombre: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  parteUtilizada: {
    type: String,
    required: true,
  },
  habitatRecoleccion: {
    type: String,
    required: true,
  },
  principiosActivos: {
    type: String,
    required: true,
  },

  empleo: {
    type: String,
    // enum: [
    //   "Digestivas",
    //   "Cardiovasculares",
    //   "Respiratorias",
    //   "Nerviosos",
    //   "Dolorosos",
    //   "Genitourinarias ",
    // ],
    required: true,
  },
});
const PlantaModel = model("Planta", plantaSchema);

module.exports = PlantaModel;
