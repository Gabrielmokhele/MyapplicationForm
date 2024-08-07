const { MyFiles } = require("../models");

exports.getAllMyFiles = async (req, res) => {
  try {
    let MyFilesData = await MyFiles.findAll();

    return res.status(200).json({
      success: true,
      data: MyFilesData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

exports.createMyFile = async (req, res) => {
  const {
    name,
    lastModified,
    lastModifiedDate,
    size,
    type,
    webkitRelativePath,
    filePath,
  } = req.body;

  try {
    const createdFiles = await MyFiles.create({
      name,
      lastModified,
      lastModifiedDate,
      size,
      type,
      webkitRelativePath,
      filePath,
    });

    return res.status(200).json({
      success: true,
      message: "myfiles created successfully",
      data: createdFiles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating myfiles",
      error,
    });
  }
};

const { Myfiles } = require("../models");
