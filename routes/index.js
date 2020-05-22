const express = require("express");
const router = express.Router();
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");

// return console.log(`
// -----------------------------
// -----------------------------
// node says : wax on / wax off !
// -----------------------------
// -----------------------------`
// );

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  res.render("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.render("baz");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;
