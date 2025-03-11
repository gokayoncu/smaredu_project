const mongoose = require("mongoose");
const slugify = require("slugify");
const Category = require("./Category");
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
  slug: { type: String, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

CourseSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true, trim: true });
  next();
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
