const express = require('express');
const router = express.Router();
const logIncollection = require("../models/admin.model.js");
const memberModel = require("../models/member.model.js");
const { generateToken } = require("../../utils/auth.js");
const {isMemberLoggedIn,isMemberBlocked} = require("../middilware/middilware.js");
const jwt = require("jsonwebtoken");


router
.route("/login")
.get( (req, res) => {
  res.render("memberSignin");
})
.post(async (req, res) => {
  try {
    
    const {email} = req.body;
    
    const member = await memberModel.findOne({email})
    if (!member || member.password !== req.body.password) {
      return res.render("memberSignin", {
        errorMessage: "Invalid username or password",
      });
    }

    if (member.blocked) {
      return res.render("memberSignin", {
        errorMessage: "You'r Account Blocked By Admin",
      });
    }
    // member.countryCode = countryCode;
    // member.mobile = mobile;
    // member.countryName = countryName;
    await member.save();

    const token = await generateToken(member);
    res.cookie("360Followers", token, { httpOnly: true, maxAge: 2 * 30 * 24 * 60 * 60 * 1000 });
    
    return res.redirect('/member/dashboard')
    
  } catch (err) {
    console.log(err);
    return res.redirect('/member/login') 
  }
});

router.get('/dashboard',isMemberLoggedIn , isMemberBlocked, async(req,res)=>{
  try {
    let admin = await logIncollection.findOne({cid: req.user.cid})
    let user = await memberModel.findById(req.user.id).populate({
      path: "myleads", // Populating 'myleads' field from user
      populate: [
        { path: "status" }, // Populate the 'status' field inside each lead
        { path: "remarks", options: { sort: { createdAt: -1 } } }, // Populate 'remarks' and sort by 'createdAt'
      ],
    })

    let whtsConn = await wAModel.findOne({cid:req.user.id})
    let pipes = await pipelineModel.find({cid:req.user.cid})
    let leads = await leadsModel.find({cid:req.user.cid})

    // console.log(user.myleads[0]);
    
    res.render('memberDashboard',{leads,admin,user,whtsConn,pipes})
  } catch (err) {
    res.status(500).send("Internal error");
    console.log(err);
    
  }
})

module.exports = router;
