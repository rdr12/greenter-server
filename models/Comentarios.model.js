const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const commentarySchema = new Schema({
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

const CommentaryModel = model("Commentary", commentarySchema);

module.exports = CommentaryModel;
