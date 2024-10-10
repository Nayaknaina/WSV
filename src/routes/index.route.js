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
const otpGenerator = require("otp-generator");
const { sendMail } = require("../service/mailSender.js");
const { app } = require("firebase-admin");

router.get("/", (req, res) => {
  res.sendFile(path.join(static_path, "index.html"));
});

router.post("/api/verify", async (req, res) => {
  try {
    const { email } = req.body;
    let user = await logIncollection.findOne({ email });
    if (!user) user = await memberModel.findOne({ email });

    if (user) {
      return res.status(500).json({ msg: "try with another email !" });
    }

    const otpCode = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const mailMsg = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <div style="text-align: center;">
        <img src="https://example.com/logo.png" alt="Web Soft Valley" style="width: 100px;"/>
        <h2>360Followups.com</h2>
        <p>Developing Future</p>
      </div>
      <h3>Hello !</h3>
      <p>Welcome to 360followups.com ! We're excited to have you on board.

        To complete your account setup, please verify your email address by using the One-Time Password (OTP) below:</p>
   
      <p>Otp : <strong>${otpCode}</strong></p>
      <div style="text-align: center;">
        This OTP is valid for **15 minutes**. Enter it in the registration form to activate your account and explore all the amazing features we offer.

        **If you didn’t request this OTP**, simply ignore this email—no action is needed.

        Thank you for choosing 360followups.com! If you have any questions or need assistance, feel free to reach out to us.

        Best wishes,
      </div>
      <p>Regards,<br> 360followups.com</p>
    </div>
  `;
    const subject = "Your OTP for Account Creation";
    const isSent = await sendMail(email, mailMsg, subject);
    req.session.otp = otpCode;
    console.log(isSent);
    res.json({ msg: "mail sent successfully !" });
  } catch (err) {
    console.log("error in /api/verify :- ", err);
  }
});

router.post('/api/otp/verify',(req,res)=>{
  try {
    let otp = req.session.otp;
    delete req.session.otp
    let {reqOtp} = req.body;
    console.log(otp, reqOtp);
    if (reqOtp === otp) {
      res.json({msg: 'email verification successfully'})
    }else{
      res.json({msg:'otp verification failed'})
    }
  } catch (err) {
    console.log("Error in /api/otp/verify", err);
  }
})


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
  const { name, mobile, countryCode, address, city, state, organisation, sector } = req.body;
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
    user.organisation = organisation;
    user.sector = sector;
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
     

    if (req.user.role == "admin") {
      user = await logIncollection
        .findById(req.user.id)
        .populate({
          path: "myleads", // Populating 'myleads' field from user
          populate: [
            { path: "status" }, // Populate the 'status' field inside each lead
            // { path: "uid" }, // Populate the 'status' field inside each lead
            { path: "remarks", options: { sort: { createdAt: -1 } } }, // Populate 'remarks' and sort by 'createdAt'
          ],
        })
        .populate("teams");
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
      .populate("status")
      .populate("uid") // Ensure that 'status' is populated
      .sort({ createdAt: -1 });

    // let lead = await leadsModel
    //   .findById('66ed6c684e1f1c79f01999a1')
    //   .populate("uid") // Ensure that 'status' is populated

    let pipes = await pipelineModel.find({ cid: user.cid });
    let members = await memberModel.find({ cid: user.cid });
    console.log(leads, "asdfghjkl");

    res.render("leads", { user, leads, pipes, members });
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
    let defSt = await pipelineModel.findOne({ defaultVal: true });
    if (defSt) {
      lead.status = defSt;
    }
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
  let leads = await leadsModel.find({ statusTime: { $ne: null } });
  console.log(leads);

  let pipe = await pipelineModel.findById(req.body.pipeId);

  if (!lead) {
    return res.redirect("/leads");
  }
  lead.status = pipe._id;
  lead.statusTime = new Date();
  await lead.save();
  // console.log(pipe.color);

  res.json({ color: pipe.color });
});

module.exports = router;
