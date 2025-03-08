const express = require("express");

const app = express();
const port = 3000;

// View Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.status(200).render("index", { pageName: "index" });
});
app.get("/about", (req, res) => {
  res.status(200).render("about", { pageName: "about" });
});
app.get("/courses", (req, res) => {
  res.status(200).render("courses", { pageName: "courses" });
});
app.get("/dashboard", (req, res) => {
  res.status(200).render("dashboard", { pageName: "dashboard" });
});
app.get("/contact", (req, res) => {
  res.status(200).render("contact", { pageName: "contact" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
