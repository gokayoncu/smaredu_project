const nodemailer = require("nodemailer");
const Course = require("../models/Course");
const User = require("../models/User");
exports.getHomePage = async(req, res) => {
  const courses = await Course.find().sort({createdAt: -1}).limit(2);
  const totalCourses = await Course.countDocuments();
  const totalStudents = await User.countDocuments({role: "student"});
  const totalTeachers = await User.countDocuments({role: "teacher"});
  res.status(200).render("index", { pageName: "index" ,courses, totalCourses, totalStudents, totalTeachers});
};
exports.getAboutPage = (req, res) => {
  res.status(200).render("about", { pageName: "about" });
};
exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", { pageName: "register" });
};
exports.getLoginPage = (req, res) => {
  res.status(200).render("login", { pageName: "login" });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", { pageName: "contact" });
};
exports.sendEmail = async (req, res) => {
 
  const outputMessage = `
  
  <h1>Mail Details </h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}</p>
  `

  // let transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: "deneme@gmail.com", 
  //     pass: "sadasdasd564564", 
  //   },
  // });

  // let info = await transporter.sendMail({
  //   from: '"Smart EDU Contact Form" <deneme@gmail.com>',
  //   to: "deneme@gmail.com", 
  //   subject: "Smart EDU Contact Form New Message ✔",
  //   html: outputMessage, 
  // });

  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  req.flash("success", "We Received your message succesfully");
  res.status(200).redirect('contact');

};
