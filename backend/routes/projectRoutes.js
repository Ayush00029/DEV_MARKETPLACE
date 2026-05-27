import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
  buyProject,
} from "../controllers/projectController.js";

import protect, { userOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, userOnly, createProject);

router.get("/", getProjects);

router.delete("/:id", protect, deleteProject);

router.post("/:id/buy", protect, userOnly, buyProject);

export default router;