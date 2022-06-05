//MODELO DE COMENTARIOS
const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const comentariosSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  planta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Planta",
  },

  text: {
    type: String,
    required: true,
  },
});

const CommentaryModel = model("Comentarios", comentariosSchema);

module.exports = CommentaryModel;
