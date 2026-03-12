const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
  }),
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const imageRouter = require("./router/image.router");

app.use("/api/images", imageRouter);

module.exports = app;
