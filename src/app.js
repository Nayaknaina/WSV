const express = require("express");
const app = express();
const path = require("path");
const { Collection } = require("mongoose");
const port = process.env.PORT || 8000;
const templatepath = path.join(__dirname, "../template");
const logIncollection = require("./db/conn");
require("./db/conn");
const hbs = require("hbs");
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const axios = require('axios');

const { generateToken, authenticate } = require('../utils/auth');

// Middleware
app.use(cookieParser()); // Add this line
app.use(session({
  secret: process.env.JWT_SECRET, // Use your JWT secret as the session secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Set secure to true if using HTTPS
}));



const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

app.use(express.static('public'));//this

app.use(express.json());

app.set("view engine", "hbs");
app.set("views", templatepath);

app.use(express.static('template'));//this
// app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
  res.sendFile(path.join(static_path, "index.html"));
});

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


// app.post("/login",async(req,res)=>{
  
//   try{const check=await logIncollection.findOne({name:req.body.name})
// if(check.password==req.body.password){
//   res.render("dashboard")
// }
// else{
//   res.send("Wrong password")
// }
// }
// catch
// {
//  res.send("Wrong credentials")
// }
// })
// app.post("/login", async (req, res) => {
//   try {
//     const check = await logIncollection.findOne({ email: req.body.email });
//     if (check && check.password === req.body.password) {
//      res.render("dashboard", { user: data });
//     } else {
//       res.send("Wrong email or password");
//     }
//   } catch {
//     res.send("Wrong credentials");
//   }
// });

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
    console.error('Error logging in user:', err);
    return res.render('signup', { errorMessage: 'Server error' });
  }
});


// app.get("/",(req,res)=>{
//      res.send("hello NAINA  ")
// });

app.listen(port, () => {
  console.log(`Server is running at   localhost:${port}`);
});


