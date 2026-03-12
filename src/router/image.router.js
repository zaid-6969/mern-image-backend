const express = require("express")

const router = express.Router()

const imageController = require("../controller/image.controller")
const upload = require("../middleware/upload.middleware")

router.post("/upload", upload.single("image"), imageController.uploadImage)

router.get("/", imageController.getImages)

router.get("/:id", imageController.getImageById)

router.delete("/:id", imageController.deleteImage)

module.exports = router