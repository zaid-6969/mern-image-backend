const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const imageRouter = require("./router/image.router");

app.use("/api/images", imageRouter);

module.exports = app;
