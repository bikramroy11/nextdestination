const express = require("express");
const router=express.Router({mergeParams: true});
const asyncWrap = require("../utils/asyncWrap");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const {listingSchema, reviewSchema}= require("../schema");
const Review = require("../models/review");
const listing=require("./listingRoute");
const {validateReview, isLoggedIn, isAuthor}= require("../middleware");

const reviewController= require("../controllers/reviewController");
//review-route-------------------------------------

//review-create
router.post(
  "/", 
  isLoggedIn, 
  validateReview, 
  asyncWrap(reviewController.createReview)
);

// review-delete
router.delete(
  "/:reviewId", 
  isLoggedIn, 
  isAuthor, 
  asyncWrap(reviewController.deleteReview)
);

//review-edit ##########(not complete)########### ==============
router.get("/:reviewId/edit", (req, res)=>{
  let {id, reviewId}= req.params;
  req.flash("error", " 'Edit Review' feature currently Not Available!!!");
  res.redirect(`/listings/${id}`);
});

module.exports=router;