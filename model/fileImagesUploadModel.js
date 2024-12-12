const mongoose = require("mongoose");
const schema = mongoose.Schema;
const imageFileSchema = new schema(
  {
    // image: {
    //   type: String,
    //   required: true,
    // },
    // imageDescription: {
    //   type: String,
    //   required: true,
    // },
    file: {
      type: String,
      required: true,
    },
    fileDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("imageFile", imageFileSchema);
