if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path"); 
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy= require("passport-local");
const User=require("./models/user");

const listingRouter=require("./routes/listingRoute");
const reviewRouter=require("./routes/reviewRoute");
const userRouter=require("./routes/userRouter");
const bookingRoute=require("./routes/bookingRoute");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const atlasUrl=process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("connected to db nextdestination");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(atlasUrl);
}

app.listen(3000, () => {
  console.log("listen port 3000");
});

// app.get("/testlistings", async (req, res)=>{
//     let sampleListings= new Listing({
//         title:"home",
//         description:"my home",
//         price:30,
//         location:"kolkata",
//         country:"india",
//     });
//     let sample= await sampleListings.save();
//     console.log(sample);
//     res.send("data saved");
// });


const store= MongoStore.create({ 
  mongoUrl: atlasUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter: 24*3600,
});

store.on("error", ()=>{
  console.log("Error in mongo session store", err);
})

//session & flash------------
const sessionOptions={
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now()+ 1000*60*60*24*3,
    maxAge:  1000*60*60*24*3,
    httpOnly: true
  },
};

app.use(session(sessionOptions));
app.use(flash());

//passport- authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// demo user created----
// app.get("/demouser", async(req, res)=>{
//   let fakeUser= new User({
//     email: "student@gmail.com",
//     username: "student",
//   });
//   let registerUser=await User.register(fakeUser, "student"); //"student" is password here
//   res.send(registerUser);
// })

app.use((req, res, next) => {
    res.locals.currentUrl = req.originalUrl;
    next();
});


//local flash message
app.use((req, res, next)=>{
  res.locals.success= req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user; //check current user for login/logout
  next();
})




//listingRouter & reviewRouter
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

//booking
app.use('/listings/:id/bookings', bookingRoute);

//error handler
app.use((err, req, res, next) => {
  let { status = 500, message = "error occurred in route" } = err;
  // res.status(status).send(message);
  res.status(status).render("listings/error.ejs", {status, message});
});



