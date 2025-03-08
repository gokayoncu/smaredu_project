const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  try {
    res.status(201).json({
      status: "success",
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      success: false,
      message: error.message,
    });
  }
};
