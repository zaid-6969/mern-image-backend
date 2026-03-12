// const multer = require("multer")
// const path = require("path")

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../../uploads"))
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname)
//   }
// })

// const upload = multer({ storage })

// module.exports = upload

const multer = require("multer");

// Use memory storage — no local folder needed (works on Render)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;