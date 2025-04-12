const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/taskController");
const validateRequest = require("../middleware/validate");
const {
  taskValidationSchema,
  taskStatusValidationSchema,
} = require("../validation/taskValidation");

router.post("/", validateRequest(taskValidationSchema), createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", validateRequest(taskValidationSchema), updateTask);
router.delete("/:id", deleteTask);

router.patch(
  "/:id/status",
  validateRequest(taskStatusValidationSchema),
  updateTaskStatus
);

module.exports = router;
