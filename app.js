const express = require("express");
const mongoose = require("mongoose");
const pageRouter = require("./routes/pageRouter");
const courseRouter = require("./routes/courseRouter");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/smart_edu", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// View Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));

// Routes
app.use("/", pageRouter);
app.use("/courses", courseRouter);

// Error Handling
app.use((req, res) => {
  res.status(404).render("error", { pageName: "error" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
