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
  const member = await memberModel.findById(req.user.id);
  if (member.blocked) {
    res.redirect("/member/login");
  } else next();
}

function isSubscriptionValid(user) {
  if (user.subscriptionLevel === 'free') {
    const now = new Date();
    return user.subscriptionExpiry > now; // Check if the subscription has expired
  }
  return true; // For other levels, assume the subscription is valid
}


module.exports = {
  isAdminLoggedIn,
  isMemberLoggedIn,
  isMemberBlocked,
  isSubscriptionValid
}