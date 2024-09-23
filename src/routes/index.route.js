const express = require("express");
const router = express.Router();
const logIncollection = require("../models/admin.model.js");
const pipelineModel = require("../models/pipeline.model.js");
const memberModel = require("../models/member.model.js");
// const WAmodel = require("./models/whatsappSession.model.js");
const remarkModel = require("../models/remark.model.js");
const leadsModel = require("../models/leads.model.js");
const templateModel = require("../models/temlate.model.js");
const { isAdminLoggedIn } = require("../middilware/middilware.js");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.sendFile(path.join(static_path, "index.html"));
});

router.get("/profile", isAdminLoggedIn, async (req, res) => {
  let user;
  if (req.user.role === "admin")
    user = await logIncollection.findById(req.user.id);
  else user = await memberModel.findById(req.user.id);

  res.render("profile", { user });
});

router.get("/connect", isAdminLoggedIn, async (req, res) => {
  const user = req.user;
  res.render("connect", { user, allLeads: null });
});
// Login and Signup routes
router.get("/login", (req, res) => {
  res.render("signup");
});

// router
router.get("/apps", isAdminLoggedIn, (req, res) => {
  const user = req.user;
  res.render("app", { user });
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
    let user;
    console.log("leads page");

    if (req.user.role === "admin") {
      user = await logIncollection.findById(req.user.id).populate({
        path: "myleads", // Populating 'myleads' field from user
        populate: [
          { path: "status" }, // Populate the 'status' field inside each lead
          { path: "remarks", options: { sort: { createdAt: -1 } } }, // Populate 'remarks' and sort by 'createdAt'
        ],
      });
    } else {
      user = await memberModel.findById(req.user.id).populate({
        path: "myleads", // Populating 'myleads' field from user
        populate: [
          { path: "status" }, // Populate the 'status' field inside each lead
          { path: "remarks", options: { sort: { createdAt: -1 } } }, // Populate 'remarks' and sort by 'createdAt'
        ],
      });
    }
    let leads = await leadsModel
      .find({ cid: user.cid })
      .populate("status") // Ensure that 'status' is populated
      .sort({ createdAt: -1 });
    let pipes = await pipelineModel.find({ cid: user.cid });
    // console.log(user.myleads[0].status);

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
    lead.userType = "logIncollection";
    await admin.save();
    await lead.save();
  } else {
    let member = await memberModel.findById(req.user.id);
    member.myleads.push(lead._id);
    lead.uid = member._id;
    lead.userType = "teamMember";
    await member.save();
    await lead.save();

    console.log("bokking the leads by ", member);
  }
  res.redirect("/leads");
});

router.post("/lead/status/update/:id", isAdminLoggedIn, async (req, res) => {
  let { id } = req.params;

  let lead = await leadsModel.findById(id).populate("status");
  let pipe = await pipelineModel.findById(req.body.pipeId);

  if (!lead) {
    return res.redirect("/leads");
  }
  lead.status = pipe._id;
  await lead.save();
  console.log(pipe.color);

  res.json({ color: pipe.color });
});

/*
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
*/

module.exports = router;
