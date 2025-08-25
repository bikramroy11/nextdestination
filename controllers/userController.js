const User=require("../models/user");


module.exports.renderSignupUserForm=(req, res)=>{
    res.render("users/signup.ejs");
}
module.exports.signupUser=async(req, res)=>{
    try {
        let {username, email, password}= req.body;
        const newUser= new User({email, username});
        let registeredUser=await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Registration Successfull!! Welcome to nextDestination");
            res.redirect("/listings");
        })
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginUserForm=(req, res)=>{
    res.render("users/login.ejs");
};

module.exports.loginUser = (req, res) => {
    const redirectUrl = req.session.redirectUrl || "/listings";
    delete req.session.redirectUrl;

    req.flash("success", "Welcome back to nextDestination !!");
    res.redirect(redirectUrl);
};



module.exports.logoutUser=(req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "User successfully Logout!!!");
        res.redirect("/listings");
    });
};