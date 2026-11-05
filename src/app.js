
import express from "express";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

export default app;
