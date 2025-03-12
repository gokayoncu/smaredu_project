const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      user: req.session.userID,
    });
    req.flash("success", `${course.name} created successfully`);
    res.status(201).redirect("/courses");
  } catch (error) {
    req.flash("error", error.message);
    res.status(400).redirect("/courses");
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};
    if (categorySlug) {
      filter.category = category?._id;
    }
    if (query) {
      filter.name = { $regex: ".*" + query + ".*", $options: "i" };
    }

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .populate("user");
    const categories = await Category.find();

    res
      .status(200)
      .render("courses", { courses, categories, pageName: "courses" });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      success: false,
      message: error.message,
      error: error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const loginUser = await User.findById(req.session.userID);
    const categories = await Category.find();
    res
      .status(200)
      .render("course-single", {
        course,
        loginUser,
        categories,
        pageName: "course-single",
      });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      success: false,
      message: error.message,
      error: error,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    if (!course) {
      return res.status(404).json({
        status: "fail",
        success: false,
        message: "Course not found",
      });
    }

    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;

    // Save the updated course
    await course.save();

    res.status(200).redirect(`/courses/${course.slug}`); // Redirect to the updated course page
  } catch (error) {
    res.status(400).json({
      status: "fail",
      success: false,
      message: error.message,
      error: error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ slug: req.params.slug });

    req.flash("error", `${course.name} has been removed successfully`);

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      success: false,
      message: error.message,
      error: error,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    if (!course) {
      return res.status(404).json({
        status: "fail",
        success: false,
        message: "Course not found",
      });
    }
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    await course.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      success: false,
      message: error.message,
      error: error,
    });
  }
};

