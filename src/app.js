const express = require("express")

const app = express()

app.use(express.json())

const imageRouter = require("./router/image.router")

app.use("/api/images", imageRouter)

module.exports = app