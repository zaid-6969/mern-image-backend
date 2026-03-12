const Image = require("../model/image.model");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload buffer to ImageKit
    const result = await imagekit.upload({
      file: req.file.buffer,           // file is in memory now
      fileName: req.file.originalname,
    });

    const image = await Image.create({
      image: result.url,               // store ImageKit URL in MongoDB
      caption: req.body.caption,
    });

    res.json({ message: "Image uploaded", data: image });

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
