const express = require('express');
const router = express.Router();
const logIncollection = require("../models/admin.model.js");
const memberModel = require("../models/member.models.js");
const { generateToken } = require("../../utils/auth.js");

const jwt = require("jsonwebtoken");


router
.route("/login")
.get( (req, res) => {
  res.render("memberSignin");
})
.post(async (req, res) => {
  try {
    const {email, password} = req.body;
    const member = await memberModel.findOne({email})
    if (!member || member.password !== req.body.password) {
      return res.render("memberSignin", {
        errorMessage: "Invalid username or password",
      });
    }
   
    const token = await generateToken(member);
    res.cookie("360Followers", token, { httpOnly: true, maxAge: 2 * 30 * 24 * 60 * 60 * 1000 });
    
    return res.redirect('/member/dashboard')
    
  } catch (err) {
    console.log(err);
    return res.redirect('/member/login') 
  }
});

router.get('/dashboard', isMemberLoggedIn ,async(req,res)=>{
  try {
    res.render('memberDashboard')
  } catch (err) {
    
  }
})

module.exports = router;

function isMemberLoggedIn(req,res,next){
  // console.log("isAdminLoggedIn middilware");
  const token = req.cookies["360Followers"];
  
  if (!token || token === undefined) {
    return res.redirect("/member/login");
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
     return res.redirect("/member/login");
    }   
    
    req.user = decoded;
    // console.log(req.user);
   return next();
  });
}