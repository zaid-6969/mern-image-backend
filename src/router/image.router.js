const express = require("express")

const router = express.Router()

const imageController = require("../controller/image.controller")
const upload = require("../middleware/upload.middleware")

router.post("/upload", upload.single("image"), imageController.uploadImage)

router.get("/", imageController.getImages)

router.put("/update/:id", upload.single("image"), imageController.updateImage)

router.delete("/:id", imageController.deleteImage)

router.get("/:id", imageController.getImageById)

module.exports = router