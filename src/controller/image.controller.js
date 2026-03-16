const Image = require("../model/image.model");
const { uploadFile, deleteFile } = require("../service/storage.service");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const result = await uploadFile(req.file.buffer);

    const image = await Image.create({
      image: result.url,
      fileId: result.fileId,
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
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    console.log("Deleting ImageKit file:", image.fileId);

    await deleteFile(image.fileId);

    await Image.findByIdAndDelete(req.params.id);

    res.json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const id = req.params.id;

    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    let updateData = {
      caption: req.body.caption,
    };

    if (req.file) {
      // delete old image from ImageKit
      await deleteFile(image.fileId);

      const result = await uploadFile(req.file.buffer);

      updateData.image = result.url;
      updateData.fileId = result.fileId;
    }

    const updatedImage = await Image.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      message: "Image updated successfully",
      data: updatedImage,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
