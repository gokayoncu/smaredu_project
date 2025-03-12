const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRouter = require("./routes/pageRouter");
const courseRouter = require("./routes/courseRouter");
const categoryRouter = require("./routes/categoryRouter");
const userRouter = require("./routes/userRouter");
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/smartedu-db", {
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

// Global variables
global.userIn=null; 

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'my_secret_key',
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

// Routes
app.use('*',(req, res,next)=>{
  global.userIn=req.session.userID;
  next();
})
app.use("/", pageRouter);
app.use("/courses", courseRouter);  
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

// Error Handling
app.use((req, res) => {
  res.status(404).render("error", { pageName: "error" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
