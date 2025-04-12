const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");


const app = express();


app.use(express.json());
app.use(cors());


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


app.use("/api/tasks", taskRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "Sorry There is no html page!!!! Welcome to Task Management API",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
