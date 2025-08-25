//checked that the user is loggedin or not
module.exports.isLoggedIn=(req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        console.log(req.originalUrl);
        
        req.flash("error", "Please Login to made any changes!!!");
        return res.redirect("/login");
    }
    next();
}

//post-login redirect
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.body.redirect) {
        req.session.redirectUrl = req.body.redirect;
    }
    next();
};


//listing route authorization
const Listing=require("./models/listing");
module.exports.isOwner= async(req, res, next)=>{
    let {id}= req.params;
    let listing= await Listing.findById(id);
    if(! listing.owner.equals(res.locals.currUser._id)){
      req.flash("error", "Your're not Owner of the Property!!!");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

//review authorization
const Review=require("./models/review");
module.exports.isAuthor= async(req, res, next)=>{
    let {reviewId}= req.params;
    let review= await Review.findById(reviewId);
    if(! review.author.equals(res.locals.currUser._id)){
      req.flash("error", "Your're not Author of the Review!!!");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

//joi- schema validation for listings
const ExpressError = require("./utils/ExpressError");
const {listingSchema, reviewSchema}= require("./schema");
module.exports.validateListing=(req, res, next)=>{
  let {error}= listingSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};

//joi- schema validation for reviews
module.exports.validateReview=(req, res, next)=>{
  let {error}= reviewSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
}