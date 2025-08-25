const Listing=require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken= process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// index route
module.exports.index = async (req, res, next) => {
  try {
    const { category } = req.query;
    let allListings;
    if (category && category !== "All") {
      // Filter only this category
      allListings = await Listing.find({ category });
    } else {
      // Default: show all
      allListings = await Listing.find();
    }
    res.render("listings/index.ejs", {
      allListings,
      activeCategory: category || "All", // pass which one is active
    });
  } catch (err) {
    next(err);
  }
};


//new route
module.exports.renderNewForm=(req, res, next) => {
  res.render("listings/new.ejs");
};
module.exports.createListing=async (req, res, next) => {
  let response=await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  })
    .send();
    
  let url=req.file.path;
  let filename= req.file.filename;
  const newListing = new Listing(req.body.listing); //"listing" obj set in form
  newListing.owner=req.user._id;
  newListing.image={url, filename};
  const geoData = response.body.features[0];
  if (!geoData) {
    req.flash("error", "Location not found!");
    return res.redirect("/listings/new");
  }
  newListing.geometry = geoData.geometry;
  newListing.category = req.body.listing.category;
  await newListing.save();
  req.flash("success", "New listing created !!");
  res.redirect("/listings");
};

//update route
module.exports.renderEditForm=async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "listing you request does not exist !!!");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_70,w_150");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};
module.exports.updateListing=async (req, res, next) => {
    let response=await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
      .send();

    let { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(
      id, { ...req.body.listing }, { new: true, runValidators: true }
    );

    const geoData = response.body.features[0];
    if (!geoData) {
      req.flash("error", "Location not found!");
      return res.redirect("/listings/new");
    }
    updatedListing.geometry = geoData.geometry;

    if(typeof req.file !== "undefined"){ //for image upload file
      let url=req.file.path;
      let filename= req.file.filename;
      updatedListing.image={url, filename};
    }
    
    await updatedListing.save();
    req.flash("success", "Listing is Updated !!");
    res.redirect(`/listings/${id}`);
};

//delete route
module.exports.deleteListing=async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing is Deleted !!");
    res.redirect("/listings");
};

//show route
module.exports.showListing=async (req, res, next) => {
    let listing = await Listing.findById(req.params.id).populate({
      path:"reviews", // first populate the "reviews" array in Listing
      populate:{path:"author"}, // then, inside each review, populate its "author"
    }).populate("owner");
    if(! listing){
      req.flash("error", "Requested Listing does not exist");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};