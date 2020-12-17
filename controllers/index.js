const express = require("express");
const Voter = require("../models/voter");
const fs = require("fs");

exports.getLogin = (req, res, next) => {
  res.render("index/login");
};

exports.postLogin = (req, res, next) => {
  const mobile = req.body.mobile;
  const adhar = req.body.adhar;

  Voter.findOne({ adhar: adhar, mobile: mobile })
    .then((voter) => {
      if (!voter) {
        console.log("wrong info entered");
        return res.redirect("/");
      }
      let digits = "0123456789";
      let otp = "";
      for (let i = 0; i < 4; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      voter.otp = otp;
      console.log(otp,"bruh");

      voter.save().then((result) => {
        req.session.user = voter;
        req.session.save((err) => {
          console.log(err);
          res.redirect("/verifyotp");
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getVerifyOtp = (req, res, next) => {
  res.render("index/verifyotp");
};

exports.postVerifyOtp = (req, res, next) => {
  const digit1 = Number(req.body.digit1);
  const digit2 = Number(req.body.digit2);
  const digit3 = Number(req.body.digit3);
  const digit4 = Number(req.body.digit4);

  const otp = digit1 * 1000 + digit2 * 100 + digit3 * 10 + digit4;

  

  if (otp.toString() === req.user.otp) {
    req.session.isAuthenticated = true;
    req.session.save((err) => {
      console.log(err);
      res.redirect("/faceverify");
    });
  } else {
    console.log("wrong otp entered");
    res.redirect("/");
  }
};

exports.getVotePage = (req, res, next) => {
  if (!req.session.isVerified) {
    return res.redirect("/");
  }
  const election = JSON.parse(
    fs.readFileSync("./build/contracts/Election.json")
  );
  fs.writeFileSync("./public/Election.json", JSON.stringify(election));
  res.render("index/vote");
};

exports.getFaceVerify = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return res.redirect("/");
  }
  voterid = req.user.id;
  Voter.findById(voterid)
    .then((voter) => {
      res.render("index/facecam", { imageUrl: voter.imageUrl });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postFaceVerification = (req, res, next) => {
  isVerified = req.body.isVerified;
  if (isVerified) {
    req.session.isVerified = true;
    req.session.save((err) => {
      console.log(err);
      return res.status(200).send("/vote");
    });
  } else {
    return res.status(200).send("/");
  }
};
