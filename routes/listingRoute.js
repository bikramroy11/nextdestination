const express = require("express");
const router=express.Router();
const asyncWrap = require("../utils/asyncWrap");
const {isLoggedIn, isOwner, validateListing}= require("../middleware");
const multer  = require('multer');
const {storage}= require("../cloudConfig");
const upload = multer({ storage });

const listingController= require("../controllers/listingController");

//------MVC---- Implemented--------

//index page & createListing route
router.route("/")
  .get(asyncWrap(listingController.index))
  .post(isLoggedIn,validateListing,
    upload.single("listing[image]"),
    asyncWrap(listingController.createListing));

//newForm route
router.get(
  "/new", 
  isLoggedIn, 
  listingController.renderNewForm);

//updateForm route
router.get( 
  "/:id/edit", 
  isLoggedIn, 
  isOwner, 
  asyncWrap(listingController.renderEditForm));

// updateRoute & deleteRoute & showRoute
router.route("/:id")
  .put(isLoggedIn, validateListing, isOwner, upload.single("listing[image]"),
   asyncWrap(listingController.updateListing))
  .delete(isLoggedIn, isOwner, asyncWrap(listingController.deleteListing))
  .get(asyncWrap(listingController.showListing));


module.exports=router;