const { Schema, model } = require("mongoose");

const plantaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  parteUtilizada: {
    type: String,
    required: true
  },
  habitatRecolección: {
    type: String,
    required: true
  },
  principiosActivos: {
    type: String,
    required: true
  },

  empleo: {
    type: String,
    enum: [
      "Digestivas",
      "Cardiovasculares",
      "Respiratorias",
      "Nerviosos",
      "Dolorosos",
      "Genitourinarias ",
    ],
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const PlantaModel = model("Planta", plantaSchema);

module.exports = PlantaModel;
