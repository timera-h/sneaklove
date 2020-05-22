const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./../models/User");

router.get("/signup", (req, res) => {
    res.render("signup", { title: "Inscription"  });
  });
  
  router.get("/signin", (req, res) => {
    res.render("signin", { title: "Connexion"});
  });

  router.post("/signup", (req, res) =>{
    res.redirect("signin")
});
  router.post("/signin", (req, res, next)=>  {
    const userInfos = req.body; 
    console.log("<<<<<<<<<<<<< ", userInfos)

    if (!userInfos.email || !userInfos.lastname || !userInfos.name ||!userInfos.password){
        req.flash("warning", "Veuillez remplir tout les champs !!!!!");
        res.redirect("/signin");
    }
    userModel
    .findOne({ email: userInfos.email })
    .then((user) => {
      if (!user) {
    
        req.flash("error", "Identifiants incorrects");
        res.redirect("/signin");
      }
     
      const checkPassword = bcrypt.compareSync(
        userInfos.password, 
        user.password 
      ); 

 
      if (checkPassword === false) {
        req.flash("error", "Identifiants incorrects");
        res.redirect("/signin");
      }
     
      const { _doc: clone } = { ...user };
      delete clone.password;
      req.session.currentUser = clone; 
      res.redirect("/index");
    })
    .catch(next);
});

module.exports = router;
