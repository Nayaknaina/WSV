const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const templatepath = path.join(__dirname, "../template");
const logIncollection = require("./db/conn");
const hbs = require("hbs");
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const axios = require('axios');
const MongoStore = require('connect-mongo');

const { generateToken, authenticate } = require('../utils/auth');

// Middleware
const sessionStore = process.env.NODE_ENV === 'production'
  ? MongoStore.create({ mongoUrl: process.env.MONGO_URI }) // Replace with your MongoDB connection URI
  : new session.MemoryStore();

app.use(session({
  secret: process.env.JWT_SECRET, // Use your JWT secret as the session secret
  resave: false,
  saveUninitialized: true,
  store: sessionStore, // Use the appropriate session store
  cookie: {
    secure: true, // Always true since you're using HTTPS
    maxAge: 1000 * 60 * 60 * 24, // Optional: Set cookie expiration (e.g., 1 day)
    httpOnly: true, // Helps to prevent XSS attacks by not allowing client-side JavaScript to access the cookie
    sameSite: 'strict', // Helps to prevent CSRF attacks
  }
}));



const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(express.urlencoded({extended: false}));

// Serve static files from 'template' directory
app.use(express.static('template'));

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

app.get("/logout", (req, res) => {
  // Clear the session or cookies here
  res.clearCookie('token');
  res.redirect("/");
});

app.get("/connect", (req, res) => {
  // Clear session or cookies here
  res.render("connect");
});

// app.post("/signup",async(req,res)=>{
//   const data={
//      name:req.body.name,
//      password:req.body.password
     
//   }
// await logIncollection.insertMany([data])

// res.render("dashboard")
// })

//for facebook business Login

app.get('/auth/facebook/callback', async (req, res) => {
  const { code } = req.query;

  try {
      const response = await axios.get(`https://graph.facebook.com/v20.0/oauth/access_token`, {
          params: {
              client_id: '446678988272887',
              redirect_uri: 'https://360followups.com/auth/facebook/callback',
              client_secret: '46d7bcf496e7cb36a1d16ea5a72c8965',
              code: code
          }
      });

      const { access_token } = response.data;
      // Store the access_token securely, usually in a database

      // Redirect to dashboard after successful login
      res.redirect('/dashboard');
  } catch (error) {
      console.error('Error fetching access token:', error);
      res.send('Error logging in with Facebook.');
  }
});


//for signups

app.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.render('signup', { errorMessage: 'password do not match' });
    // return res.send("Passwords do not match!");
  }

  const data = { name, email, password };

  try {
    const user = await logIncollection.insertMany([data]);
    const token = await generateToken(user[0]);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    res.render('dashboard', { user: data });
  } catch (err) {
    res.status(500).send("Error signing up");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await logIncollection.findOne({ email: req.body.email });

    if (!check || check.password !== req.body.password) {
      return res.render('signup', { errorMessage: 'Invalid username or password' });
    }

    const token = await generateToken(check);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    res.render('dashboard', { user: check });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});


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


