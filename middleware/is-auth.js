exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/");
  }
  next();
};

exports.isVerified = (req,res,next)=>{
    if(!req.session.isVerfied){
        return res.redirect("/");
    }
    next();
}
