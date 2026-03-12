const Image = require("../model/image.model");

exports.uploadImage = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const image = await Image.create({
      image: req.file.path,
      caption: req.body.caption
    });

    res.json({
      message: "Image uploaded",
      data: image
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getImages = async (req, res) => {
  const images = await Image.find();

  res.json(images);
};

exports.getImageById = async (req, res) => {
  const image = await Image.findById(req.params.id);

  res.json(image);
};

exports.deleteImage = async (req, res) => {
  await Image.findByIdAndDelete(req.params.id);

  res.json({
    message: "Image deleted",
  });
};
