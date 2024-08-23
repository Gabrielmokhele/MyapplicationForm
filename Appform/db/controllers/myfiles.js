const { MyFiles } = require("../models");
const jwt = require('jsonwebtoken');

const JWT_SECRET = '12345iusdfhbdaisofhario';

exports.createMyFile = async (req, res) => {
  const file = req.file; 
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userId = user.id;

    const createdFile = await MyFiles.create({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      lastModified: Date.now(),
      lastModifiedDate: new Date(), 
      webkitRelativePath: file.webkitRelativePath || "",
      filePath: file.path,
      userId: userId,
    });

    return res.status(200).json({
      success: true,
      message: "File created successfully",
      data: createdFile,
    });
  } catch (error) {
    console.error('Error creating file:', error);
    return res.status(500).json({
      success: false,
      message: "Error creating file",
      error: error.message,
    });
  }
};





// const upload = multer({dest: 'uploads/'});

// exports.createMyFile = async (req, res) => {
//   const { file } = req.files;

//   try {
//     const createdFiles = await MyFiles.create({
//       name: file.name,
//       type: file.mimetype,
//       size: file.size,
//       lastModified: Date.now(), 
//       lastModifiedDate: new Date(file.lastModified), 
//       webkitRelativePath: file.webkitRelativePath || "",
//       filePath: file.path, 
//     });

//     return res.status(200).json({
//       success: true,
//       message: "myfiles created successfully",
//       data: createdFiles,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error creating myfiles",
//       error,
//     });
//   }
// };

// exports.getAllMyFiles = async (req, res) => {
//   try {
//     let MyFilesData = await MyFiles.findAll();

//     return res.status(200).json({
//       success: true,
//       data: MyFilesData,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error,
//     });
//   }
// };

