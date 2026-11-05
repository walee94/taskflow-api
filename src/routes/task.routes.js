
import { Router } from "express";

import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask
} from "../controllers/task.controllers.js";

const router = Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.patch("/:id", updateTask);


export default router;
