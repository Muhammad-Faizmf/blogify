const { Router } = require("express");
const User = require("../models/user");
const { createTokenForUser } = require("../services/authentication");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect password",
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await User.create({ fullName, email, password });
    return res.render("signup", {
      message: "Your account has been created successfully!. Please log in",
    });
  } catch (error) {
    return res.render("signup", {
      message: error,
    });
  }
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

module.exports = router;
