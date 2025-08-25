const Review= require("../models/review");
const Listing=require("../models/listing");

module.exports.createReview=async(req, res, next)=>{
  let listing= await Listing.findById(req.params.id);
  let newReview= new Review(req.body.review);
  newReview.author=req.user._id; //author of the review
  listing.reviews.push(newReview); // push into listing schema's review array
  await newReview.save();
  await listing.save();
  req.flash("success", "Your Review is Added !!");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.deleteReview=async(req, res, next)=>{
  let {id, reviewId}=req.params;
  await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Your Review is Deleted!!!");
  res.redirect(`/listings/${id}`);
};