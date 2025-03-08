const express = require("express");
const pageRouter = require("./routes/pageRouter");
const app = express();
const port = 3000;

// View Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));

// Routes
app.use("/", pageRouter);

// Error Handling
app.use((req, res) => {
  res.status(404).render("error", { pageName: "error" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
