const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },
  
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // image: {
    //   type: String,
    // },

    password: String,
    profilePic: {
      type : String
    }
  },
  
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
