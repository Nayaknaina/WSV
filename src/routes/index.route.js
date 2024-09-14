const express = require("express");
const router = express.Router();
const logIncollection = require("../models/admin.model.js");
const pipelineModel = require("../models/admin.model.js");
const memberModel = require("../models/member.model.js");
// const WAmodel = require("./models/whatsappSession.model.js");
const remarkModel = require("../models/remark.model.js");
const leadsModel = require("../models/leads.model.js");
const templateModel = require("../models/temlate.model.js");
const { isAdminLoggedIn } = require("../middilware/middilware.js");

const jwt = require("jsonwebtoken");

router.get("/profile", isAdminLoggedIn, async (req, res) => {
  let user;
  if (req.user.role === "admin")
    user = await logIncollection.findById(req.user.id);
  else user = await memberModel.findById(req.user.id);
  
  res.render("profile", { user });
});


router.post("/update/profile", isAdminLoggedIn, async (req, res) => {
  let user;
  const { name, mobile, countryCode, address, city, state } = req.body;
  try {
    if (req.user.role === "admin")
      user = await logIncollection.findById(req.user.id);
    else user = await memberModel.findById(req.user.id);

    user.name = name;
    user.mobile = mobile;
    user.countryCode = countryCode;
    user.address = address;
    user.city = city;
    user.state = state;
    await user.save();
    res.redirect("/profile");
  } catch (err) {
    console.log("error in /user/update/profile route ---- :", err);
    res.redirect("/profile");
  }
});


router.get("/gethelp", isAdminLoggedIn, async (req, res) => {
  let user;
  if (req.user.role === "admin")
    user = await logIncollection.findById(req.user.id);
  else user = await memberModel.findById(req.user.id);

  res.render("gethelp", { user });
});


// Facebook Leads Fetch Route
router.get("/leads", isAdminLoggedIn, async (req, res) => {
  try {
    let admin;
    console.log("leads page");

    if (req.user.role === "admin") {
      user = await logIncollection.findById(req.user.id).populate({
        path: "myleads",
        populate: {
          path: "status", // Populate status from leads
        },
        populate: {
          path: "remarks", // Populate remarks from leads
          options: { sort: { createdAt: -1 } }, // Sorting remarks in descending order by createdAt
        },
      });
    } else {
      user = await memberModel.findById(req.user.id).populate({
        path: "myleads",
        populate: {
          path: "status", // Populate status from leads
        },
        populate: {
          path: "remarks",
          options: { sort: { createdAt: -1 } },
        },
      });
    }

    let leads = await leadsModel.find({ cid: user.cid }).populate("status");
    let pipes = await pipelineModel.find({ cid: user.cid });
    // let remarks = await remarkModel.find({ uid: user._id }).sort({ createdAt: -1 });

    res.render("leads", { user, leads, pipes });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).send("Error fetching leads");
  }
});

router.get("/lead/book/:id", isAdminLoggedIn, async (req, res) => {
  let { id } = req.params;

  let lead = await leadsModel.findById(id);
  if (!lead) {
    return res.redirect("/leads");
  }

  if (req.user.role === "admin") {
    let admin = await logIncollection.findById(req.user.id);
    admin.myleads.push(lead._id);
    lead.uid = admin._id;
    await admin.save();
    await lead.save();
  } else {
    let member = await memberModel.findById(req.user.id);
    member.myleads.push(lead._id);
    lead.uid = member._id;
    await member.save();
    await lead.save();

    console.log("bokking the leads by ", member);
  }
    res.redirect("/leads");
});

router.get("/lead/remove/:id", isAdminLoggedIn, async (req, res) => {
  let { id } = req.params;

  let lead = await leadsModel.findById(id);
  if (!lead) {
    return res.redirect("/leads");
  }
  if (req.user.role === "admin") {
    let admin = await logIncollection.findById(req.user.id);
    admin.myleads.splice(admin.myleads.indexOf(lead._id), 1);
    lead.uid = "";
    lead.remarks = []    

    await admin.save();
    await lead.save();
  } else {
    let member = await memberModel.findById(req.user.id);
    member.myleads.splice(member.myleads.indexOf(lead._id), 1);
    lead.uid = "";
    lead.remarks = []

    await member.save();
    await lead.save();

    console.log("bokking the leads by ", member);
  }
  res.redirect("/leads");
});

router.post("/lead/status/update/:id", isAdminLoggedIn, async (req, res) => {
  let { id } = req.params;

  let lead = await leadsModel.findById(id);
  let pipe = await pipelineModel.findById(req.body.pipeId);

  if (!lead) {
    return res.redirect("/leads");
  }
  lead.status = pipe._id;
  await lead.save();

  res.redirect("/leads");
});

// router.post("/remark/add/:id", isAdminLoggedIn, async (req, res) => {
//   const { id } = req.params;
//   const { text, time, date } = req.body;
//   let user;

//   if (req.user.role === "admin") {
//     user = await logIncollection.findById(req.user.id);
//   } else user = await memberModel.findById(req.user.id);

//   let userContact = user.mobile;
//   // console.log(req.body, "====", userContact);
//   let lead = await leadsModel.findById(id);

//   let remark = new remarkModel({
//     uid: user._id,
//     cid: user.cid,
//     lead_id: lead._id,
//     text,
//     time,
//     date,
//   });
//   await remark.save();

//   lead.remarks.push(remark._id);
//   await lead.save();
//   // console.log(lead);

//   const mobileRegex = /^[6-9]\d{9}$/;
//   let leadContactNo;
//   lead.leads_data.forEach((item) => {
//     const answer = item.ans.trim();

//     if (mobileRegex.test(answer)) {
//       console.log("Valid Mobile Number found:", answer);
//       leadContactNo = answer;
//     }
//   });

//   console.log(leadContactNo);
//   leadContactNo = "9755313770";
//   const remarkDateTime = new Date(`${date}T${time}:00`);
//   const currentTime = new Date();

//   let timeDifference = remarkDateTime - currentTime;
//   timeDifference -= (1000 * 60 * 30)
//   const reminderTemplate = await templateModel.findOne({ cid: req.user.cid, num: 3 });
//   const afterCallTemp = await templateModel.findOne({ cid: req.user.cid, num: 2 });
//   console.log(timeDifference);
  
//   let reminderTempImagePath, reminderTempPdfPath, LeadTempImagePath,LeadTempPdfPath;
//   if (timeDifference > 0) {
//     setTimeout(() => {

//       if (reminderTemplate.image !== "") { // img for user
//         reminderTempImagePath = path.join(
//           __dirname,
//           "../template/images/uploads/whatsapp/",
//           reminderTemplate.image
//         );
//       }
//       if (reminderTemplate.pdf !== "") { // pdf for user 
//         reminderTempPdfPath = path.join(
//           __dirname,
//           "../template/images/uploads/whatsapp/",
//           reminderTemplate.pdf
//         );
//       }
//       if (afterCallTemp.image !== "") {  // img for lead
//         LeadTempImagePath = path.join(
//           __dirname,
//           "../template/images/uploads/whatsapp/",
//           afterCallTemp.image
//         );
//       }
//       if (afterCallTemp.pdf !== "") { // pdf for lead
//         LeadTempPdfPath = path.join(
//           __dirname,
//           "../template/images/uploads/whatsapp/",
//           afterCallTemp.pdf
//         );
//       }

//       sendMessageToLead(leadContactNo, afterCallTemp.text, reminderTempImagePath, reminderTempPdfPath); // after temp msg sending to lead
//     }, timeDifference);
//   }
//   setTimeout(() => {
//     sendMessageToLead(userContact,reminderTemplate.text,LeadTempImagePath,LeadTempPdfPath) // reminder temp for user
//   }, 5000);

//   return res.json(remark);
// });


module.exports = router;
