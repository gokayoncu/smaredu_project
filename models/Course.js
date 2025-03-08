const mongoose = require("mongoose");
const Scheema = mongoose.Schema;

const CourseSchema = new Scheema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
