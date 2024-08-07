const { Experiences, Educations } = require("../models");

exports.getAllEducationsAndExpriences = async (req, res) => {
  try {
    let educations = await Educations.findAll();
    let experiences = await Experiences.findAll();

    return res.status(200).json({
      success: true,
      data: { educations, experiences },
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

exports.createEducationsAndExpriences = async (req, res) => {
  const { experiences: expData, educations: eduData } = req.body;

  try {
    const experiences = await Promise.all(
      expData.map((exp) => Experiences.create(exp))
    );

    const educations = await Promise.all(
      eduData.map((edu) => Educations.create(edu))
    );

    return res.status(200).json({
      success: true,
      message: "Educations and experiences created successfully",
      data: { experiences, educations },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating Educations and Experiences",
      error,
    });
  }
};
