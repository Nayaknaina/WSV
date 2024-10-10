const express = require("express");
const router = express.Router();

// Apply middleware for parsing only on this router
router.use(express.urlencoded({ extended: true })); // Parse form data
router.use(express.json()); // Parse JSON data
// const {initializeWhatsAppClient} = require("../app3.js");
const logIncollection = require("../models/admin.model.js");
const pipelineModel = require("../models/pipeline.model.js");
const memberModel = require("../models/member.model.js");
const remarkModel = require("../models/remark.model.js");
const leadsModel = require("../models/leads.model.js");
const templateModel = require("../models/temlate.model.js");
const WaModel = require("../models/wA.model.js");
// const manualLeadModel = require("../models/manualLeads.model.js");

const otpGenerator = require("otp-generator");
const { sendMail } = require("../service/mailSender.js");
const { isAdminLoggedIn } = require("../middilware/middilware.js");
const { generateToken } = require("../../utils/auth.js");
const { upload } = require("../service/multer.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { uploadProfile } = require("../service/multer.js");

router.get("/team", isAdminLoggedIn, async (req, res) => {
  let user;
  if (req.user.role === "admin") {
    user = await logIncollection.findById(req.user.id).populate("teams");
  }
  let msg = req.session.successMSG;
  delete req.session.successMSG;
  let errMsg = req.session.errorMSG;
  delete req.session.errorMSG;
  res.render("team", { user, successMSG: msg, errorMSG: errMsg });
});

router.get("/lead/remove/:id", isAdminLoggedIn, async (req, res) => {
  let { id } = req.params;

  let lead = await leadsModel.findById(id);
  if (!lead) {
    return res.redirect("/leads");
  }

  let admin = await logIncollection.findById(req.user.id);
  admin.myleads.splice(admin.myleads.indexOf(lead._id), 1);
  lead.uid = null;
  lead.userType = null;
  // lead.remarks = [];

  await admin.save();
  await lead.save();

  res.redirect("/leads");
});

// lead ownership assign other member by admin
router.post("/change/lead/owner/:leadId", isAdminLoggedIn, async (req, res) => {
  try {
    let lead = await leadsModel.findById(req.params.leadId);
    let currentLeadOwner = await memberModel.findById(req.body.currentMemId);
    let nextLeadOwner = await memberModel.findById(req.body.assignMemId);

    if (!currentLeadOwner)
      currentLeadOwner = await logIncollection.findById(req.body.currentMemId);

    if (lead && currentLeadOwner && nextLeadOwner) {
      lead.uid = nextLeadOwner._id;
      lead.userType =
        nextLeadOwner.role === "admin" ? "logIncollection" : "teamMember";

      if (currentLeadOwner._id !== nextLeadOwner._id)
        currentLeadOwner.myleads.splice(
          currentLeadOwner.myleads.indexOf(lead._id),
          1
        );
      nextLeadOwner.myleads.push(lead._id);
    }

    await lead.save();
    await currentLeadOwner.save();
    await nextLeadOwner.save();

    return res.json({ name: nextLeadOwner.name });
  } catch (err) {
    console.log("Error in /user/change/lead/owner/:leadId", err);
    res.status(500).send("Ooops, Some Internal Error");
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post(
  "/profile/image",
  isAdminLoggedIn,
  uploadProfile.single("userImage"),
  async (req, res) => {
    try {
      let user = await logIncollection.findById(req.user.id);

      if (!req.file) {
        console.log("File not exists");
        return res.status(404).send("No file was given");
      }

      console.log("File exists");
      if (user.profilePicture) {
        const oldImagePath = path.join(
          __dirname,
          "../../template/",
          user.profilePicture
        );

        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted successfully.");
          }
        });
      }

      console.log(req.file.filename);
      user.profilePicture = "/images/uploads/profile/" + req.file.filename;
      await user.save();

      res.redirect("/user/dashboard");
    } catch (err) {
      console.log("error in /member/profile/image", err);
    }
  }
);

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = await logIncollection.findOne({ email });

    if (user)
      return res.render("signup", { errorMessage: "User already exists" });
    if (password !== confirmPassword)
      return res.render("signup", { errorMessage: "Passwords do not match" });

    const cid = uuidv4();
    const newUser = new logIncollection({
      name,
      email,
      password,
      cid,
      role: "admin",
    });
    await newUser.save();
    console.log(newUser);

    const pipelines = [
      { title: "win", color: "#28A745", defaultVal: false },
      { title: "lost", color: "#DC3545", defaultVal: false },
      { title: "on hold", color: "#007BFF", defaultVal: true },
      { title: "pending", color: "#FFC107", defaultVal: false },
    ].map(
      (pipelineData) =>
        new pipelineModel({
          uid: newUser._id,
          defaultVal: pipelineData.defaultVal,
          color: pipelineData.color,
          title: pipelineData.title,
          cid: newUser.cid,
        })
    );

    // Save all pipelines in parallel
    await Promise.all(
      pipelines.map(async (pipeline) => {
        await pipeline.save();
        newUser.myPipelines.push(pipeline._id);
      })
    );

      const templates = [
      {
        title: "Reminder Message To Customer",
        text: `Dear [Customer Name],

This is a friendly reminder from [360FollowUps]. We have a scheduled follow-up call with you on [Date] at [Time]. Our representative will be reaching out to discuss your requirements.

If you have any questions or need to reschedule, please feel free to let us know.

Looking forward to speaking with you!

Best Regards,
The [360FollowUps] Team`,
        client: true,
        team: false,
        num: 1,
      },

      {
        title: "Reminder Message To Team Member",
        text: `Hello [Team Member Name],

Just a reminder that you have a follow-up call scheduled with [Customer Name] on [Date] at [Time]. Please make sure you are prepared with all the necessary details.

Good luck with the call, and let us know if you need any assistance!

Best Regards,
The [360FollowUps] System`,
        client: false,
        team: true,
        num: 2,
      },

      {
        title: "Thankyou Message To Customer",
        text: `Dear [Customer Name],

Thank you for taking the time to speak with us today. We appreciate the opportunity to understand your needs better and to discuss how we can assist you further.

If you have any questions or need more information, please don’t hesitate to reach out. We look forward to continuing our conversation and helping you achieve your goals.

Best Regards,
The [360FollowUps] Team`,
        client: true,
        team: false,
        num: 5,
      },

      {
        title: "Notification Message To Team Members",
        text: `Hello [Team Member Name],

A new lead has been added to the CRM. Here are the details:
- *Lead Name:* [Customer Name]
- *Contact Number:* [Customer Contact Number]
- *Date Received:* [Date]
- *Lead Source:* [Lead Source]

Please follow up with the lead at your earliest convenience to ensure a prompt response.

Best,
The [360FollowUps] System`,
        client: false,
        team: true,
        num: 3,
      },

      {
        title: "Wellcome Message To Customer",
        text: `Dear [Customer Name],

Welcome to [360FollowUps]! We’re thrilled to have you on board. Our team will be reaching out to you shortly to understand your needs and help you find the best solutions.

If you have any immediate questions, feel free to get in touch with us. We're here to support you every step of the way!

Best Regards,
The [360FollowUps] Team`,
        client: true,
        team: false,
        num: 4,
      },
    ].map(
      (temp) =>
        new templateModel({
          uid: newUser._id,
          title: temp.title,
          text: temp.text,
          num: temp.num,
          client: temp.client,
          team: temp.team,
          cid: newUser.cid,
        })
    );

    // Save all pipelines in parallel
    await Promise.all(
      templates.map(async (temp) => {
        await temp.save();
        newUser.myTemplates.push(temp._id);
      })
    );
    await newUser.save();

    const token = await generateToken(newUser);

    res.cookie("360Followers", token, {
      httpOnly: true,
      maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
    });
    res.redirect("/user/dashboard");
  } catch (err) {
    res.status(500).send("Error signing up");
  }
});

// ! pipeline are here

router.post("/pipeline", isAdminLoggedIn, async (req, res) => {
  const { title, color } = req.body;
  console.log(req.body);

  const user = await logIncollection.findById(req.user.id);
  const pipes = await pipelineModel.find({ cid: req.user.cid });

  if (pipes.length >= 5) {
    // Correcting the condition to "greater than or equal to 5"
    req.session.errorMSG = `You can't add more than 5 pipelines status`;
    return res.status(400).json({ error: req.session.errorMSG });
  }

  const pipeline = new pipelineModel({
    uid: user._id,
    color,
    title,
    cid: user.cid,
  });

  await pipeline.save();

  // Prepare the response object to send back
  const responsePipeline = {
    _id: pipeline._id,
    title: pipeline.title,
    color: pipeline.color,
  };

  req.session.successMSG = `${title} pipeline creation success.`;
  res.status(201).json(responsePipeline); // Send JSON response with the new pipeline
});

router.get("/pipeline/del/:id", isAdminLoggedIn, async (req, res) => {
  const { id } = req.params;
  let pipeline = await pipelineModel.findByIdAndDelete(id);
  // console.log(pipeline);
  let allPipes = await pipelineModel.find({ cid: req.user.cid });
  req.session.successMSG = `${pipeline.title} pipline deletion sucessfull !. `;
  res.json(allPipes);
});
// router.get("/pipe/abc", isAdminLoggedIn, async (req, res) => {
//   let pipe = await pipelineModel.findById(req.session.pipe);
//   pipe.defaultVal = true;
//   await pipe.save();

//   delete req.session.pipe;
//   req.session.save();

//   let allPipes = await pipelineModel.find({ cid: req.user.cid });
//   res.json(allPipes);
//   // res.redirect("/user/dashboard");
// });
router.post("/pipeline/update", isAdminLoggedIn, async (req, res) => {
  // const { title, color, defaultVal, id} = req.body;
  console.log(req.body);
  req.body.forEach(async (dataObj) => {
    const { title, color, defaultVal, id } = dataObj;

    let pipeline = await pipelineModel.findById(id);

    pipeline.color = color;
    pipeline.title = title;

    if (defaultVal == "on") {
      // console.log(defaultVal);
      await pipelineModel.updateMany(
        { uid: req.user.id },
        { $set: { defaultVal: false } }
      );

      let pipe = await pipelineModel.findById(id);
      pipe.defaultVal = true;
      await pipe.save();
    }

    await pipeline.save();
  });
  req.session.successMSG = `pipline updatation successfully !. `;
  let allPipes = await pipelineModel.find({ cid: req.user.cid });
  return res.json(allPipes);
});

// router.get("/profile", isAdminLoggedIn, async (req, res) => {
//   const user = await logIncollection.findById(req.user.id);

//   res.render("profile", { user });
// });

// router.post("/update/profile", isAdminLoggedIn, async (req, res) => {
//   let user;
//   const { name, mobile, countryCode, address, city, state } = req.body;
//   try {
//     if (req.user.role === "admin")
//       user = await logIncollection.findById(req.user.id);
//     else user = await memberModel.findById(req.user.id);

//     user.name = name;
//     user.mobile = mobile;
//     user.countryCode = countryCode;
//     user.address = address;
//     user.city = city;
//     user.state = state;
//     await user.save();
//     res.redirect("/profile");
//   } catch (err) {
//     console.log("error in /user/update/profile route ---- :", err);
//     res.redirect("/profile");
//   }
// });

router.get("/dashboard", isAdminLoggedIn, async (req, res) => {
  try {
    console.log("we are in a /user/dashboard");
    const user = await logIncollection.findById(req.user.id).populate({
      path: "myleads", // Populating 'myleads' field from user
      populate: [
        { path: "status" }, // Populate the 'status' field inside each lead
        { path: "remarks", options: { sort: { createdAt: -1 } } }, // Populate 'remarks' and sort by 'createdAt'
      ],
      options: { sort: { statusTime: -1 } },
    });

    if (!user.organizationName) {
      return res.render("dashboard", { showForm: true });
    }

    const pipes = await pipelineModel
      .find({ cid: user.cid })
      .sort({ defaultVal: -1 })
      .exec();
    const leads = await leadsModel.find({ cid: user.cid }).populate("status");
    // res.json({})
    // console.log(req.session.successMSG);
    let msg = req.session.successMSG;
    // console.log(req.session.successMSG);

    let errMsg = req.session.errorMSG;

    delete req.session.successMSG;
    delete req.session.errorMSG;
    console.log(msg, errMsg);

    res.render("dashboard", {
      user,
      pipes,
      leads,
      successMSG: msg,
      errorMSG: errMsg,
    });
    // res.render("dashboard", { user, pipes, leads, showForm: false,qrCode: qrCodeImage });
  } catch (error) {
    console.log("error in dashboard", error);

    res.status(500).send("Internal error");
  }
});

// router.post(
//   "/template/update/:id",
//   isAdminLoggedIn,
//   upload.fields([{ name: "image" }, { name: "pdf" }]),
//   async (req, res) => {
//     let { id } = req.params;
//     let template = await templateModel.findById(id);

//     let { title, text, client, team } = req.body;

//     template.title = title;
//     template.text = text;

//     template.client = client === "on" ? true : false;
//     template.team = team === "on" ? true : false;
//     let imageFile = req.files["image"] ? req.files["image"][0].filename : "";
//     let pdfFile = req.files["pdf"] ? req.files["pdf"][0].filename : "";

//     // console.log("from form");
//     // console.log(imageFile);
//     // console.log(pdfFile);

//     // console.log("template");
//     // console.log(template.image);
//     // console.log(template.pdf);

//     if (imageFile !== "" && template.image !== "") {
//       const imagePath = path.join(
//         __dirname,
//         "..",
//         "template",
//         "images",
//         "uploads",
//         "whatsapp",
//         template.image
//       );

//       fs.unlink(imagePath, (err) => {
//         if (err) {
//           console.log("Error removing file", err);
//           return;
//         }
//         console.log("file removed successfully");
//       });
//       template.image = imageFile;
//     } else if (imageFile !== "") {
//       template.image = imageFile;
//     }

//     if (pdfFile !== "" && template.pdf !== "") {
//       const pdfPath = path.join(
//         __dirname,
//         "..",
//         "template",
//         "images",
//         "uploads",
//         "whatsapp",
//         template.pdf
//       );

//       fs.unlink(pdfPath, (err) => {
//         if (err) {
//           console.log("Error removing file", err);
//           return;
//         }
//         console.log("file removed successfully");
//       });
//       template.pdf = pdfFile;
//     } else if (pdfFile !== "") {
//       template.pdf = pdfFile;
//     }

//     await template.save();
//     // console.log(req.body);
//     res.redirect("/user/template");
//   }
// );

// Signup handler

// Login handler
router.post("/login", async (req, res) => {
  try {
    const user = await logIncollection.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.render("signup", {
        errorMessage: "Invalid username or password",
      });
    }

    const token = await generateToken(user);
    res.cookie("360Followers", token, {
      httpOnly: true,
      maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
    });
    res.redirect("/user/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("360Followers");
  res.redirect("/");
});

// router.get('/member/dashboard/:memId', isAdminLoggedIn, (req,res)=>{
//   req.session.memId = req.params.memId;
//   res.redirect('/user/member/dashboard');
// })

// router.get('/member/dashboard', isAdminLoggedIn, async (req,res)=>{
//   try {
//     let user = await memberModel.findById(req.session.memId).populate({
//       path: "myleads", // Populating 'myleads' field from user
//       populate: [
//         { path: "status" }, // Populate the 'status' field inside each lead
//         { path: "remarks", options: { sort: { createdAt: -1 } } }, // Populate 'remarks' and sort by 'createdAt'
//       ],
//     })

//     // delete req.session.memId;
//     // console.log(user);

//     let whtsConn = await WaModel.findOne({cid:user.cid})
//     let pipes = await pipelineModel.find({cid:user.cid})
//     let leads = await leadsModel.find({cid:user.cid})

//     let admin = await logIncollection.findById(req.user.id)

//     res.render('memberDashboard',{
//       leads,
//       admin,
//       user,
//       whtsConn,
//       pipes
//     });
//   } catch (err) {
//     console.log("Error in /user/member/dashboard with error :- ", err);
//     res.status(500).send("Internal error")
//   }

// })

router.get("/member/blocked/:id", isAdminLoggedIn, async (req, res) => {
  try {
    let member = await memberModel.findById(req.params.id);
    console.log(member);

    member.blocked = true;
    await member.save();
    req.session.successMSG = `Now ${member.name} is blocked`;
    res.redirect("/user/team");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal error");
  }
});

router.get("/member/un-blocked/:id", isAdminLoggedIn, async (req, res) => {
  try {
    let member = await memberModel.findById(req.params.id);
    console.log(member);

    member.blocked = false;
    await member.save();
    req.session.successMSG = `Now ${member.name} is Un-blocked`;
    res.redirect("/user/team");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal error");
  }
});

module.exports = router;
