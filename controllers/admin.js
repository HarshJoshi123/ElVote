const Voter = require("../models/voter");

exports.getRegister = (req, res, next) => {
  res.render("admin/register");
};

exports.postRegister = (req, res, next) => {
  const mobile = req.body.mobile;
  const adhar = req.body.adhar;
  const image = req.file;

  const imageUrl = image.path;

  const voter = new Voter({
    mobile: mobile,
    adhar: adhar,
    imageUrl: imageUrl,
  });
  voter
    .save()
    .then((result) => {
      console.log("image saving is working!!");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
