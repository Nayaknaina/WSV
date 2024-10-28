const express = require("express");
const router = express.Router();

// Apply middleware for parsing only on this router
router.use(express.urlencoded({ extended: true })); // Parse form data
router.use(express.json()); // Parse JSON data
const logIncollection = require("../models/admin.model.js");
const pipelineModel = require("../models/pipeline.model.js");
const memberModel = require("../models/member.model.js");
const remarkModel = require("../models/remark.model.js");
const leadsModel = require("../models/leads.model.js");
const templateModel = require("../models/temlate.model.js");
const WaModel = require("../models/wA.model.js");
// const manualLeadModel = require("../models/manualLeads.model.js");
const crypto = require('crypto');

const otpGenerator = require("otp-generator");
const { sendMail } = require("../service/mailSender.js");
const { isAdminLoggedIn, chalteRaho, chalteRahoId } = require("../middilware/middilware.js");
const { generateToken } = require("../../utils/auth.js");
const { upload } = require("../service/multer.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { uploadProfile } = require("../service/multer.js");
// const { sendMessageToLead } = require("../app.js");
const uploadCSV = require("../service/csvMulter.js");


const { csvFileDataChangIntoLeadHandler } = require("../controllers/user.controller.js");
const wAModel = require("../models/wA.model.js");
const paymentModel = require('../models/paySuccess.model.js')

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


// router.get("/lead/remove/:id", isAdminLoggedIn, async (req, res) => {
//   let { id } = req.params;

//   let lead = await leadsModel.findById(id);
//   if (!lead) {
//     return res.redirect("/leads");
//   }

//   let admin = await logIncollection.findById(req.user.id);
//   admin.myleads.splice(admin.myleads.indexOf(lead._id), 1);
//   lead.uid = null;
//   lead.userType = null;
//   // lead.remarks = [];

//   await admin.save();
//   await lead.save();

//   res.redirect("/leads");
// });

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

router.get("/website-integration", isAdminLoggedIn, async (req, res) => {
  let user;
  if (req.user.role === "admin")
    user = await logIncollection.findById(req.user.id);
  else user = await memberModel.findById(req.user.id);

  res.render("WEBIntegration", { user });
});
router.post('/generate-key', isAdminLoggedIn, async (req, res) => {
  try {
    console.log("enter");

    const user = await logIncollection.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  
    const newApiKey = crypto.randomBytes(16).toString('hex');
    user.apiKey = newApiKey;
    await user.save();
    console.log(newApiKey,"jeweufnwu");

    res.status(201).json({ apiKey: newApiKey });
  } catch (error) {
    console.error('Error generating API key:', error);
    res.status(500).json({ error: 'Error generating API key' });
  }
});


router.get('/generate-url', isAdminLoggedIn, async (req, res) => {
  try {
    const user = await logIncollection.findById(req.user.id);
    if (!user || !user.apiKey) {
      return res.status(404).json({ error: 'User or API key not found' });
    }
    const baseUrl = 'https://360followups.com/api';
    const exampleUrl = `${baseUrl}?apiKey=${user.apiKey}&name={name}&email={email}&phone={phone}&message={message}`;

    res.json({ url: exampleUrl });
  } catch (error) {
    console.error('Error generating URL:', error);
    res.status(500).json({ error: 'Error generating URL' });
  }
});


router.post('/copy-url', (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL not provided' });
    }
    res.status(200).json({ message: 'URL copied successfully', url });
  } catch (error) {
    console.error('Error copying URL:', error);
    res.status(500).json({ error: 'Error copying URL' });
  }
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
    console.log(req.body);

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
      { title: "win", color: "#28A745", defaultVal: false, num: 1 },
      { title: "lost", color: "#DC3545", defaultVal: false, num: 2 },
      { title: "on hold", color: "#007BFF", defaultVal: true, num: 3 },
      { title: "pending", color: "#FFC107", defaultVal: false, num: 4 },
    ].map(
      (pipelineData) =>
        new pipelineModel({
          uid: newUser._id,
          defaultVal: pipelineData.defaultVal,
          color: pipelineData.color,
          title: pipelineData.title,
          num: pipelineData.num,
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
        text: `*dear* [Customer Name],
  
  This is a friendly reminder from [Company Name]. We have a scheduled follow-up call with you on [Date] at [Time]. Our representative will be reaching out to discuss your requirements.
  
  If you have any questions or need to reschedule, please feel free to let us know.
  
  Looking forward to speaking with you!
  
  Best Regards,
  The [Company Name] Team`,
        client: true,
        team: false,
        num: 1,
      },

      {
        title: "Reminder Message To Team Member",
        text: `*hello* [Team Member Name],
  
  Just a reminder that you have a follow-up call scheduled with [Customer Name] on [Date] at [Time]. Please make sure you are prepared with all the necessary details.
  
  Good luck with the call, and let us know if you need any assistance!
  
  *Last Discussion:*
  [Remark Content].
  
  Best Regards,
  The [Company Name] Team`,
        client: false,
        team: true,
        num: 2,
      },

      {
        title: "Thankyou Message To Customer",
        text: `*dear* [Customer Name],
  
  Thank you for taking the time to speak with us today. We appreciate the opportunity to understand your needs better and to discuss how we can assist you further.
  
  If you have any questions or need more information, please don’t hesitate to reach out. We look forward to continuing our conversation and helping you achieve your goals.
  
  Best Regards,
  The [Company Name] Team`,
        client: true,
        team: false,
        num: 5,
      },

      {
        title: "Notification Message To Team Members",
        text: `*hello* [Team Member Name],
  
  A new lead has been added to the CRM. Here are the details:
  - *Lead Name:* [Customer Name]
  - *Contact Number:* [Customer Contact Number]
  - *Date Received:* [Date]
  - *Lead Source:* [Lead Source]
  
  Please follow up with the lead at your earliest convenience to ensure a prompt response.
  
  Best,
  The [Company Name] Team`,
        client: false,
        team: true,
        num: 3,
      },

      {
        title: "Wellcome Message To Customer",
        text: `*Dear* [Customer Name],
  
  Welcome to [Company Name]! We’re thrilled to have you on board. Our team will be reaching out to you shortly to understand your needs and help you find the best solutions.
  
  If you have any immediate questions, feel free to get in touch with us. We're here to support you every step of the way!
  
  Best Regards,
  The [Company Name] Team`,
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
    res.status(200).json({ msg: "user signup success !" });
    // res.redirect("/user/dashboard");
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
    // console.log("Connected Phone Number:", phoneNumber);
    const pipes = await pipelineModel
      .find({ cid: user.cid })
      .sort({ defaultVal: -1 })
      .exec();
    const leads = await leadsModel.find({ cid: user.cid }).populate("status");

    let msg = req.session.successMSG;
    // console.log(req.session.successMSG);
    let errMsg = req.session.errorMSG;
    let warnMsg = req.session.warnMsg;

    delete req.session.successMSG;
    delete req.session.errorMSG;
    delete req.session.warnMsg;
    let whatsappConnectedPhoneNumber;
    if (user) {
      let isconn = await wAModel.findOne({cid: user.cid});
      if (isconn) {
        whatsappConnectedPhoneNumber = isconn.connectedPhoneNumber;
      }
    }
    console.log(whatsappConnectedPhoneNumber);


    res.render("dashboard", {
      whatsappConnectedPhoneNumber: whatsappConnectedPhoneNumber || "",
      user,
      pipes,
      leads,
      successMSG: msg,
      errorMSG: errMsg,
      warnMSG: warnMsg,
    });
    // res.render("dashboard", { user, pipes, leads, showForm: false,qrCode: qrCodeImage });
  } catch (error) {
    console.log("error in dashboard", error);

    res.status(500).send("Internal error");
  }
});



// Login handler
// router.post("/login", async (req, res) => {
//   try {
//     const user = await logIncollection.findOne({ email: req.body.email });

//     if (!user || user.password !== req.body.password) {
//       return res.render("signup", {
//         errorMessage: "Invalid username or password",
//       });
//     }

//     const token = await generateToken(user);
//     res.cookie("360Followers", token, {
//       httpOnly: true,
//       maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
//     });
//     req.session.successMSG = "Your free plan started of 15 days";
//     res.redirect("/user/dashboard");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error logging in");
//   }
// });

//free plan messgg show 
router.post("/login", async (req, res) => {
  try {
    const user = await logIncollection.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.render("signup", {
        errorMessage: "Invalid username or password",
      });
    }

    // user.subscriptionExpiry =  new Date();
    // await user.save()

    const subExp = new Date(user.subscriptionExpiry);
    const today = new Date();
    const diffTime = subExp - today;
    const daysLeft = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
      console.warn(`Subscription expired. Please renew to continue.`)
      req.session.errorMSG = `Subscription expired. Please renew to continue.`;
    }
    else {// days left success left
      req.session.successMSG = `Your free plan started. You have ${daysLeft} days remaining.`
    };
    const token = await generateToken(user);
    await user.save()
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




router.post(
  "/template/update/:id",
  isAdminLoggedIn,
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  async (req, res) => {
    try {
      let { id } = req.params;
      let template = await templateModel.findById(id);

      let { title, text } = req.body;

      template.title = title;
      template.text = text;
      console.log(req.files);

      let imageFile = req.files["image"] ? req.files["image"][0].filename : "";
      let pdfFile = req.files["pdf"] ? req.files["pdf"][0].filename : "";

      if (imageFile !== "" && template.image !== "") {
        const imagePath = path.join(
          __dirname,
          "..",
          "template",
          "images",
          "uploads",
          "whatsapp",
          template.image
        );

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log("Error removing file", err);
            return;
          }
          console.log("file removed successfully");
        });
        template.image = imageFile;
      } else if (imageFile !== "") {
        template.image = imageFile;
      }

      if (pdfFile !== "" && template.pdf !== "") {
        const pdfPath = path.join(
          __dirname,
          "..",
          "template",
          "images",
          "uploads",
          "whatsapp",
          template.pdf
        );

        fs.unlink(pdfPath, (err) => {
          if (err) {
            console.log("Error removing file", err);
            return;
          }
          console.log("file removed successfully");
        });
        template.pdf = pdfFile;
      } else if (pdfFile !== "") {
        template.pdf = pdfFile;
      }

      await template.save();
      // console.log(req.body);
      res.redirect("/template");
    } catch (err) {
      console.log("Error in /template/update/id", err);
    }
  }
);
router.get("/team/invite", isAdminLoggedIn, async (req, res) => {
  try {
    const user = await logIncollection.findById(req.user.id);
    if (user.teams.length >= 3 && user.subscriptionLevel === "free") {
      req.session.errorMSG = `free`;
      return res.redirect("/user/team");
    }
    if (user.teams.length >= 7 && user.subscriptionLevel === "basic") {
      req.session.errorMSG = `basic`;
      return res.redirect("/user/team");
    }

    const { name, email, mobile, countryCode } = req.query;
    let preMem = await memberModel.findOne({ email: email });
    if (preMem !== null) {
      req.session.errorMSG = `This email ID is already registered.`;
      return res.redirect("/user/team");
    }
    preMem = await logIncollection.findOne({ email: email });
    if (preMem !== null) {
      req.session.errorMSG = `This email ID is already registered.`;
      return res.redirect("/user/team");
    }

    const password = otpGenerator.generate(8, {
      digits: true,
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
      specialChars: false,
    });

    const mailMsg = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <div style="text-align: center;">
        <img src="https://example.com/logo.png" alt="Web Soft Valley" style="width: 100px;"/>
        <h2>Web Soft Valley</h2>
        <p>Developing Future</p>
      </div>
      <h3>Hello ${name} !</h3>
      <p>Congratulations! Your account has been created successfully. You can log in now and start using our service.</p>
      <p>Email: <a href="mailto:${email}">${email}</a></p>
      <p>Password: <strong>${password}</strong></p>
      <div style="text-align: center;">
        <a href="https://360followups.com/member/login" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Login to Dashboard
        </a>
      </div>
      <p>Regards,<br>Web Soft Valley Technology</p>
    </div>
  `;
    const subject = `Invitation from ${user.name}`;
    const isSent = await sendMail(email, mailMsg, subject);
    console.log(isSent);

    // const leadContactNo = mobile;
    // const text = `Hello ${name}!\n\nCongratulations! Your account has been created successfully. You can log in now and start using our service.
    // \n\n Your email: ${email}
    // \n Your password : ${password}
    // \n\n[Click here to login](https://360followups.com/member/login)`;

    // let connStatus = await WaModel.findOne({ cid: user.cid });
    // setTimeout(() => {
    //   console.log("/team/invite route");
    //   console.log(connStatus, leadContactNo);

    //   sendMessageToLead(connStatus, leadContactNo, text); // after temp msg sending to lead
    // }, 4000);

    const newMember = new memberModel({
      name,
      email,
      password,
      countryCode,
      mobile,
      cid: user.cid,
      owner_id: user._id,
    });
    await newMember.save();
    user.teams.push(newMember._id);
    await user.save();

    req.session.successMSG = `you have invited ${name} as a team member !. `;
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/user/team");
});


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

router.post('/member/update/:memId', isAdminLoggedIn, async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    let member = await memberModel.findById(req.params.memId);

    member.name = name;
    member.email = email;
    member.mobile = mobile;
    member.save()

    res.json({ msg: "Member details update sucessfully !" })
  } catch (err) {
    console.error('Error in /user/member/update:id----', err);
  }
})
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

router.post('/upload-csv', isAdminLoggedIn, uploadCSV.single('file'), csvFileDataChangIntoLeadHandler);

router.get("/reset/all/temp", isAdminLoggedIn, async (req, res) => {
  let user = await logIncollection.findById(req.user.id);

  try {
    const result = await templateModel.deleteMany({ cid: user.cid });
    console.log(`${result.deletedCount} documents deleted.`);
    user.myTemplates = [];
    await user.save()
  } catch (error) {
    console.error("Error deleting documents:", error);
  }

  const templates = [
    {
      title: "Reminder Message To Customer",
      text: `*dear* [Customer Name],

This is a friendly reminder from [Company Name]. We have a scheduled follow-up call with you on [Date] at [Time]. Our representative will be reaching out to discuss your requirements.

If you have any questions or need to reschedule, please feel free to let us know.

Looking forward to speaking with you!

Best Regards,
The [Company Name] Team`,
      client: true,
      team: false,
      num: 1,
    },

    {
      title: "Reminder Message To Team Member",
      text: `*hello* [Team Member Name],

Just a reminder that you have a follow-up call scheduled with [Customer Name] on [Date] at [Time]. Please make sure you are prepared with all the necessary details.

Good luck with the call, and let us know if you need any assistance!

*Last Discussion:*
[Remark Content].

Best Regards,
The [Company Name] Team`,
      client: false,
      team: true,
      num: 2,
    },

    {
      title: "Thankyou Message To Customer",
      text: `*dear* [Customer Name],

Thank you for taking the time to speak with us today. We appreciate the opportunity to understand your needs better and to discuss how we can assist you further.

If you have any questions or need more information, please don’t hesitate to reach out. We look forward to continuing our conversation and helping you achieve your goals.

Best Regards,
The [Company Name] Team`,
      client: true,
      team: false,
      num: 5,
    },

    {
      title: "Notification Message To Team Members",
      text: `*hello* [Team Member Name],

A new lead has been added to the CRM. Here are the details:
- *Lead Name:* [Customer Name]
- *Contact Number:* [Customer Contact Number]
- *Date Received:* [Date]
- *Lead Source:* [Lead Source]

Please follow up with the lead at your earliest convenience to ensure a prompt response.

Best,
The [Company Name] Team`,
      client: false,
      team: true,
      num: 3,
    },

    {
      title: "Wellcome Message To Customer",
      text: `*Dear* [Customer Name],

Welcome to [Company Name]! We’re thrilled to have you on board. Our team will be reaching out to you shortly to understand your needs and help you find the best solutions.

If you have any immediate questions, feel free to get in touch with us. We're here to support you every step of the way!

Best Regards,
The [Company Name] Team`,
      client: true,
      team: false,
      num: 4,
    },
  ].map(
    (temp) =>
      new templateModel({
        uid: user._id,
        title: temp.title,
        text: temp.text,
        num: temp.num,
        client: temp.client,
        team: temp.team,
        cid: user.cid,
      })
  );

  // Save all pipelines in parallel
  await Promise.all(
    templates.map(async (temp) => {
      await temp.save();
      user.myTemplates.push(temp._id);
    })
  );
  await user.save();

  return res.status(200).json({ msg: 'done' });
});


router.get("/mysubscription", isAdminLoggedIn, async (req, res) => {
 try {
  let user = await logIncollection.findById(req.user.id)
  let paymentProofs = await paymentModel.find({uid: user._id})
  let paymentProof = paymentProofs[paymentProofs.length-1]
  res.render("subscription", { user, paymentProof});
 } catch (err) {
  console.error("Error in /user/mysubscription -",err)
 }
});


router.get("/reset/all/pipes", isAdminLoggedIn, async (req, res) => {
  let user = await logIncollection.findById(req.user.id);

  try {
    const result = await pipelineModel.deleteMany({ cid: user.cid });
    console.log(`${result.deletedCount} documents deleted.`);
    user.myPipelines = [];
    await user.save()
  } catch (error) {
    console.error("Error deleting documents:", error);
  }

  const pipelines = [
    { title: "win", color: "#28A745", defaultVal: false, num: 1 },
    { title: "lost", color: "#DC3545", defaultVal: false, num: 2 },
    { title: "on hold", color: "#007BFF", defaultVal: true, num: 3 },
    { title: "pending", color: "#FFC107", defaultVal: false, num: 4 },
  ].map(
    (pipelineData) =>
      new pipelineModel({
        uid: user._id,
        defaultVal: pipelineData.defaultVal,
        color: pipelineData.color,
        title: pipelineData.title,
        num: pipelineData.num,
        cid: user.cid,
      })
  );

  // Save all pipelines in parallel
  await Promise.all(
    pipelines.map(async (pipeline) => {
      await pipeline.save();
      user.myPipelines.push(pipeline._id);
    })
  );

  await user.save();

  res.redirect("/template");
});

module.exports = router;
