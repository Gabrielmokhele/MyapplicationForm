const { Person } = require("../models");

exports.getAllPersons = async (req, res) => {
  try {
    let personData = await Person.findAll();

    return res.status(200).json({
      success: true,
      data: personData,
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

exports.createPerson = async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    dateOfBirth,
    email,
    phone,
    addressLine1,
    addressLine2,
    city,
    province,
    country,
  } = req.body;
  try {
    const person = await Person.create({
      userId,
      firstName,
      lastName,
      dateOfBirth,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      province,
      country,
    });
    return res.status(200).json({
      success: true,
      message: "person created successfully",
      data: person,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error finding person",
      error,
    });
  }
};
