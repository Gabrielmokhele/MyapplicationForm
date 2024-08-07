const express = require("express");
const {
  getAllPersons,
  createPerson,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/forms");
const {
  getAllEducationsAndExpriences,
  createEducationsAndExpriences,
  getEducationsAndExpriencesById,
  updateEducationsAndExpriences,
  deleteEducationsAndExpriences,
} = require("../controllers/experiencesAndEducations");
const {
  getAllMyFiles,
  createMyFile,
  getMyFile,
  updateMyFile,
  deleteMyFile,
} = require("../controllers/myfiles");

const router = express.Router();

router.get("/persons", getAllPersons);
router.post("/persons", createPerson);

// router.get("/todos/:id", getTodoById);

// router.patch("/todos/:id", updateTodo);

// router.delete("/todos/:id", deleteTodo);

router.post("/educationsandexperiences", createEducationsAndExpriences);
router.get("/educationsandexperiences", getAllEducationsAndExpriences);

router.post("/myfiles", createMyFile);
router.get("/myfiles", getAllMyFiles);

module.exports = router;
