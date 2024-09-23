const jwt = require("jsonwebtoken");
const memberModel = require("../models/member.model.js");


function isAdminLoggedIn(req, res, next) {
  console.log("isAdminLoggedIn middilware");
  const token = req.cookies["360Followers"];

  if (!token || token === undefined) {
    return res.redirect("/login");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }

    req.user = decoded;
    // console.log(req.user);
    return next();
  });
}


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



async function isMemberBlocked(req, res, next) {
  const token = req.cookies["360Followers"];
  const member = await memberModel.findById(verifyToken(token));
  if (member.blocked) {
    res.redirect("/member/login");
  } else next();
}

module.exports = {
  isAdminLoggedIn,
  isMemberLoggedIn,
  isMemberBlocked
}