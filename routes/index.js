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
  res.render("home");
});

router.get("/sneakers/:cat", (req, res) => {
  res.render("");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;
