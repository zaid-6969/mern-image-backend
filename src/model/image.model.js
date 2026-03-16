const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const imageModel = mongoose.model("image", imageSchema);

module.exports = imageModel;
