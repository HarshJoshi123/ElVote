const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Voter = require("./models/voter");
const multer = require("multer");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotenv=require('dotenv');
dotenv.config();


const MONGODB_URI =process.env.MONGO_URI;
console.log(process.env.MONGO_URI,"chala")
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
   // cb(null, new Date().toISOString() + file.originalname);
     
     cb(null,file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// routes

const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype == "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// setting up the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware for decoding form data
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// middleware for multer
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("img")
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  Voter.findOne({ mobile: req.session.user.mobile })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(adminRoutes); // all the admin routes
app.use(indexRoutes); // all the general routes

// connecting to the database
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
