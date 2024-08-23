const express = require("express");
const multer = require('multer');
const router = express.Router();

const upload = multer({
  dest: 'uploads/', 
  limits: { fileSize: 1048576 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Controllers
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
const {
  registerUser,
  loginUser,
  refreshToken,
  getUserData,
  updateUserData
} = require("../controllers/Users");

const {createJobs, getAllJobs} = require("../controllers/Jobs")

router.post("/jobs", createJobs )
router.get("/jobs", getAllJobs)

router.get("/persons", getAllPersons);
router.post("/persons", createPerson);


router.post("/educationsandexperiences", createEducationsAndExpriences);
router.get("/educationsandexperiences", getAllEducationsAndExpriences);
// router.get("/educationsandexperiences/:id", getEducationsAndExpriencesById); // Get by ID
// router.patch("/educationsandexperiences/:id", updateEducationsAndExpriences); // Update by ID
// router.delete("/educationsandexperiences/:id", deleteEducationsAndExpriences); // Delete by ID


router.post('/myfiles', upload.single('file'), createMyFile);
// router.get("/myfiles", getAllMyFiles); // List all files
// router.get("/myfiles/:id", getMyFile); // Get a file by ID
// router.patch("/myfiles/:id", upload.single('file'), updateMyFile); // Update a file by ID
// router.delete("/myfiles/:id", deleteMyFile); // Delete a file by ID


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/:userId", getUserData)
router.patch("/users/:userId", updateUserData);



router.get('/step-1', (req, res) => {
  res.send('Step 1 page');
});

router.get('/step-2', (req, res) => {
  res.send('Step 2 page');
});

router.get('/step-3', (req, res) => {
  res.send('Step 3 page');
});


router.post('/refresh-token', refreshToken);
module.exports = router;

