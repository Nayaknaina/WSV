const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const templatepath = path.join(__dirname, "../template");
const logIncollection = require("./db/conn");
const hbs = require("hbs");
require("dotenv").config();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const axios = require("axios");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");
const { generateToken, authenticate } = require("../utils/auth");
const { log } = require("console");

// Middleware
const sessionStore =
  process.env.NODE_ENV === "production"
    ? MongoStore.create({
        mongoUrl:
          "mongodb+srv://nainanayak288:Dkccg5NaZMANqu7F@wsvconnect.bpxfx.mongodb.net/",
      }) // Replace with your MongoDB connection URI
    : new session.MemoryStore();

app.use(
  session({
    secret: process.env.JWT_SECRET, // Use your JWT secret as the session secret
    resave: false,
    saveUninitialized: true,
    store: sessionStore, // Use the appropriate session store
    cookie: {
      secure: true, // Always true since you're using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Optional: Set cookie expiration (e.g., 1 day)
      httpOnly: true, // Helps to prevent XSS attacks by not allowing client-side JavaScript to access the cookie
      sameSite: "strict", // Helps to prevent CSRF attacks
    },
  })
);

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve static files from 'template' directory
app.use(express.static("template"));

// Handle root request
app.get("/", (req, res) => {
  res.sendFile(path.join(static_path, "index.html"));
});

// Login and Signup routes
app.get("/login", (req, res) => {
  res.render("signup");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// ✅
app.get("/dashboard", async (req, res, next) => {
  try {
    const token = req.cookies["360Followers"];
    // console.log(token);

    const userData = await jwt.decode(token);
    if (userData === null) {
      // console.log("sjvfjs cjsagvyd vh");
      return res.redirect("/login");
    }
    console.log("helloooooo", userData);

    const user = await logIncollection.findById(userData.id);

    // console.log(user);

    res.render("dashboard", { user });
  } catch (error) {
    res.status(500).send("internal error");
  }
});

//for signups

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const user = await logIncollection.findOne({ email });

    console.log(user);

    if (user)
      return res.render("signup", { errorMessage: "user already exist" });

    if (password !== confirmPassword)
      return res.render("signup", { errorMessage: "password do not match" });

    const data = { name, email, password };

    // const user = await logIncollection.insertMany([data]);

    const newUser = new logIncollection(data);
    newUser.save();
    const token = await generateToken(newUser);
    console.log(token);

    console.log(newUser);

    res.cookie("360Followers", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    // res.render('dashboard', { user: data });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send("Error signing up");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await logIncollection.findOne({ email: req.body.email });

    if (!check || check.password !== req.body.password) {
      return res.render("signup", {
        errorMessage: "Invalid username or password",
      });
    }

    const token = await generateToken(check);

    res.cookie("360Followers", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    // res.redirect('/dashboard', { user: check });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

app.get("/logout", (req, res) => {
  // Clear the session or cookies here
  res.clearCookie("token");
  res.redirect("/");
});

app.get("/connect", (req, res) => {
  // Clear session or cookies here
  res.render("connect");
});

//for facebook business Login

// ! not for me

app.get("/auth/facebook/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const response = await axios.get(
      `https://graph.facebook.com/v20.0/oauth/access_token`,
      {
        params: {
          client_id: "446678988272887",
          redirect_uri: "https://360followups.com/auth/facebook/callback",
          client_secret: "46d7bcf496e7cb36a1d16ea5a72c8965",
          code: code,
        },
      }
    );

    const { access_token } = response.data;
    // Store the access_token securely, usually in a database

    // Redirect to dashboard after successful login
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.send("Error logging in with Facebook.");
  }
});

// ! not for me

// Handle dynamic routes to serve pages without .html extension
app.get("/:page", (req, res) => {
  const page = req.params.page;
  const filePath = path.join(static_path, `${page}.html`);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Page not found");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at   localhost:${port}`);
});
