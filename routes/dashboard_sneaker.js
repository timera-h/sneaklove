const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("./../models/Sneaker");
const uploader = require("./../config/cloudinary");

router.get("/products_add", (req, res, next) => {
    sneakerModel
    .find()
    .then((dbRes) => {
        res.render("products_add", {
            products_add: dbRes,
        })
        
    })
    .catch(next)
})

router.get("/dashboard/products_manage", (req, res, next) => {
    sneakerModel
    .find()
    .then((dbRes) => {
        res.render("dashboard/products_manage", {
            products: dbRes,
            title: "Gérer les sneakers"
        })
    })
    .catch(next);
})

router.get("/dashboard/product_edit", (req, res, next) => {
    sneakerModel
    .then((dbRes) => {
        res.render("dashboard/product_edit")
    })
    .catch(next);
})

router.post("/products_add", uploader.single("image"), (req, res, next) => {
    const newProduct = {...req.body}; console.log("le nouveau produit", newProduct);
    if (req.file) newProduct.image = req.file.secure_url; console.log("lien de l'image >>>", req.file);
    sneakerModel
    .create(newProduct)
    .then((dbRes) => {
        res.redirect("/dashboard/products_manage");
    })
    .catch(next);
});

router.post("/products/edit/:id", uploader.single("image"), (req, res, next) => {
    const updateSneaker = {...req.body};
    if (req.file) updateSneaker.image = req.file.secure_url;

    sneakerModel
    .findByIdAndUpdate(req.params.id, updateSneaker)
    .then((dbRes) => {
        res.redirect("/dashboard/products_manage")
    })
    .catch(next)
});

module.exports = router;
