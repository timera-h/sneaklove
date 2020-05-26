const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./../models/User");
const currentUser = require("./../middlewares/devMode");

router.get("/signup", (req, res) => {
    res.render("signup", { title: "Inscription"  });
  });
  
  router.get("/signin", (req, res) => {
    res.render("signin", { title: "Connexion"});
  });

  router.get("/logout", (req, res) =>{
    req.session.destroy(() => res.redirect("/signin"));
});

//   router.post("/signup", (req, res) =>{
//     res.redirect("signin")
// });
  router.post("/signin", (req, res, next)=>  {
    const userInfos = req.body; 
    console.log("<<<<<<<<<<<<< ", userInfos);

    if (!userInfos.email || !userInfos.password){
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
      req.session.currentUser = clone; console.log("c'esr ici >>>>>>>>>>>>>>>", currentUser);
      res.redirect("/signup");
    })
    .catch(next);
});

router.post("/signup", (req, res, next) => {
  const user = req.body; console.log(">>>>>>>>>>>>>>>>>", user);
  if (!user.name || !user.password || !user.email|| !user.lastname ) {
    req.flash("warning", "Merci de remplir tous les champs requis."); console.log("voici message error", req.flash);
    res.redirect("/signup");
  } else {
    userModel
      .findOne({ email: user.email })
      .then((dbRes) => {
        if (dbRes) {
        
          req.flash("warning", "Désolé, cet email n'est pas disponible.");
          res.redirect("/signup");
        }
      })
      .catch(next);

    // si le programme est lu jusqu'ici, on converti le mot de passe en chaîne cryptée
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(user.password, salt);
    // console.log("password crypté >>>", hashed);
    user.password = hashed; // on remplace le mot de passe "en clair" par sa version cryptée

    // finalement on insère le nouvel utilisateur en base de données
    userModel
      .create(user)
      .then((dbRes) => {
        req.flash("success", "Inscription validée !");
        res.redirect("/signin");
      })
      .catch(next);
  }
})
module.exports = router;
