const Image = require("../model/image.model");
const uploadFile = require("../service/storage.service");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // upload to ImageKit
    const result = await uploadFile(req.file.buffer);

    // save image URL to database
    const image = await Image.create({
      image: result.url,
      caption: req.body.caption,
    });

    res.json({
      message: "Image uploaded successfully",
      data: image,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
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

exports.updateImage = async (req, res) => {

  try {

    const id = req.params.id

    let updateData = {
      caption: req.body.caption
    }

    if (req.file) {

      const uploadFile = require("../services/storage.service")

      const result = await uploadFile(req.file.buffer)

      updateData.image = result.url
    }

    const updatedImage = await Image.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )

    res.json({
      message: "Image updated successfully",
      data: updatedImage
    })

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}