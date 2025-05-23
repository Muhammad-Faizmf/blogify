require("dotenv").config();

const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog.js");
const Blog = require("./models/blog");
const { connectMongoDB } = require("./db_config");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();

const PORT = process.env.PORT || 5000;

// JSON parsing
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// Embedded JS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Connection MongoDB
connectMongoDB(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log(e));

// Routes
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

// Start the server
app.listen(PORT, () => {
  console.log("Server is running");
});
