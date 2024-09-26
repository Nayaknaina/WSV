const express = require("express");
const router = express.Router();

// const {initializeWhatsAppClient} = require("../app3.js");
const logIncollection = require("../models/admin.model.js");
const pipelineModel = require("../models/pipeline.model.js");
const memberModel = require("../models/member.model.js");
const remarkModel = require("../models/remark.model.js");
const leadsModel = require("../models/leads.model.js");
const templateModel = require("../models/temlate.model.js");
const WaModel = require("../models/wA.model.js");
const otpGenerator = require("otp-generator");

const { sendMail } = require("../service/mailSender.js");
const { isAdminLoggedIn } = require("../middilware/middilware.js");
const { generateToken } = require("../../utils/auth.js");
const { upload } = require("../service/multer.js");
const jwt = require("jsonwebtoken");
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require("uuid");
const { uploadAdminsPro } = require("../service/multer.js");

router.get("/team", isAdminLoggedIn, async (req, res) => {
  let user;
  if (req.user.role === "admin") {
    user = await logIncollection.findById(req.user.id).populate("teams");
  }
  let msg = req.session.successMSG;
  delete req.session.successMSG;
  res.render("team", { user, successMSG: msg });
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
router.post('/change/lead/owner/:leadId', isAdminLoggedIn, async(req,res)=>{
  try {
    let lead = await leadsModel.findById(req.params.leadId)
    let currentLeadOwner = await memberModel.findById(req.body.currentMemId)
    let nextLeadOwner = await memberModel.findById(req.body.assignMemId)

    if(!currentLeadOwner)
      currentLeadOwner = await logIncollection.findById(req.body.currentMemId)

    if (lead && currentLeadOwner && nextLeadOwner) {
      lead.uid = nextLeadOwner._id;
      lead.userType = nextLeadOwner.role === 'admin' ? 'logIncollection' : 'teamMember' ;

      if(currentLeadOwner._id !== nextLeadOwner._id)
      currentLeadOwner.myleads.splice(currentLeadOwner.myleads.indexOf(lead._id),1)
      nextLeadOwner.myleads.push(lead._id);
    }

    await lead.save()
    await currentLeadOwner.save()
    await nextLeadOwner.save()

   return res.json({name:nextLeadOwner.name})
    
  } catch (err) {
    console.log("Error in /user/change/lead/owner/:leadId",err);
    res.status(500).send("Ooops, Some Internal Error")
  }
})


// router.get("/team/invite", isAdminLoggedIn, async (req, res) => {
//   try {
//     const user = await logIncollection.findById(req.user.id);
//     if (user.teams.length > 3) {
//       req.session.successMSG = `Cannot add more than 3 team members with free plan.`;
//       return res.redirect("/user/dashboard");
//     }

//     const { name, email, mobile, countryCode } = req.query;
//     const password = otpGenerator.generate(8, {
//       digits: true,
//       lowerCaseAlphabets: true,
//       upperCaseAlphabets: true,
//       specialChars: false,
//     });

//     const mailMsg = `
//     <div style="font-family: Arial, sans-serif; color: #333;">
//       <div style="text-align: center;">
//         <img src="https://example.com/logo.png" alt="Web Soft Valley" style="width: 100px;"/>
//         <h2>Web Soft Valley</h2>
//         <p>Developing Future</p>
//       </div>

//       <h3>Hello ${name} !</h3>
//       <p>Congratulations! Your account has been created successfully. You can log in now and start using our service.</p>

//       <p>Email: <a href="mailto:${email}">${email}</a></p>
//       <p>Password: <strong>${password}</strong></p>

//       <div style="text-align: center;">
//         <a href="https://360followups.com/member/login" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
//           Login to Dashboard
//         </a>
//       </div>

//       <p>Regards,<br>Web Soft Valley Technology</p>
//     </div>
//   `;
//     const subject = `Invitation from ${user.name}`;
//     const isSent = await sendMail(email, mailMsg, subject);
//     console.log(isSent);

//     const leadContactNo = mobile;
//     const text = `Hello ${name}!\n\nCongratulations! Your account has been created successfully. You can log in now and start using our service.
//     \n\n Your email: ${email}
//     \n\n Your password : ${password}
//     \n\n[Click here to login](https://360followups.com/member/login)`;

//     setTimeout(() => {
//       // if (reminderTemplate.image !== "") {
//       //   // img for user
//       //   reminderTempImagePath = path.join(
//       //     __dirname,
//       //     "../template/images/uploads/whatsapp/",
//       //     reminderTemplate.image
//       //   );
//       // }
//       // if (reminderTemplate.pdf !== "") {
//       //   // pdf for user
//       //   reminderTempPdfPath = path.join(
//       //     __dirname,
//       //     "../template/images/uploads/whatsapp/",
//       //     reminderTemplate.pdf
//       //   );
//       // }
//       // if (afterCallTemp.image !== "") {
//       //   // img for lead
//       //   LeadTempImagePath = path.join(
//       //     __dirname,
//       //     "../template/images/uploads/whatsapp/",
//       //     afterCallTemp.image
//       //   );
//       // }
//       // if (afterCallTemp.pdf !== "") {
//       //   // pdf for lead
//       //   LeadTempPdfPath = path.join(
//       //     __dirname,
//       //     "../template/images/uploads/whatsapp/",
//       //     afterCallTemp.pdf
//       //   );
//       // }

//       sendMessageToLead(
//         leadContactNo,
//         text
//       ); // after temp msg sending to lead
//     }, 4000);

//     const newMember = new memberModel({
//       name,
//       email,
//       password,
//       countryCode,
//       mobile,
//       cid: user.cid,
//       owner_id: user._id,
//     });
//     await newMember.save();
//     user.teams.push(newMember._id);
//     await user.save();

//     req.session.successMSG = `you have invited ${name} as a team member !. `;
//   } catch (error) {
//     console.log(error);
//   }
//   return res.redirect("/user/team");
// });

// router.get("/team/invite", isAdminLoggedIn, async (req, res) => {
//   try {
//     const user = await logIncollection.findById(req.user.id);
//     if (user.teams.length >= 3) {
//       req.session.successMSG = `Cannot add more than 3 team members with free plan.`;
//       return res.redirect('/user/dashboard')
//     }
//     // if (user.teams.length >= 50) {
//     //   req.session.successMSG = `Cannot add more than 50 team members with pro plan.`;
//     //   return res.redirect('/user/dashboard')
//     // }
//     const { name, email, mobile, countryCode } = req.query;
//     const password = otpGenerator.generate(8, {
//       digits: true,
//       lowerCaseAlphabets: true,
//       upperCaseAlphabets: true,
//       specialChars: false,
//     });

//     const mailMsg = `
//     <div style="font-family: Arial, sans-serif; color: #333;">
//       <div style="text-align: center;">
//         <img src="https://example.com/logo.png" alt="Web Soft Valley" style="width: 100px;"/>
//         <h2>Web Soft Valley</h2>
//         <p>Developing Future</p>
//       </div>

//       <h3>Hello ${name} !</h3>
//       <p>Congratulations! Your account has been created successfully. You can log in now and start using our service.</p>

//       <p>Email: <a href="mailto:${email}">${email}</a></p>
//       <p>Password: <strong>${password}</strong></p>

//       <div style="text-align: center;">
//         <a href="https://360followups.com/member/login" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
//           Login to Dashboard
//         </a>
//       </div>

//       <p>Regards,<br>Web Soft Valley Technology</p>
//     </div>
//   `;
//     const subject = `Invitation from ${user.name}`;
//     const isSent = await sendMail(email, mailMsg, subject);
//     console.log(isSent);

//     if (isSent[0].res === "okk") {
//       const newMember = new memberModel({
//         name,
//         email,
//         password,
//         countryCode,
//         mobile,
//         cid: user.cid,
//         owner_id: user._id,
//       });
//       await newMember.save();
//       user.teams.push(newMember._id);
//       await user.save();
//     }
//     req.session.successMSG = `you have invited ${name} as a team member !. `;
//   } catch (error) {
//     console.log(error);
//   }
//   return res.redirect("/user/team");
// });

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/profile/image", isAdminLoggedIn, uploadAdminsPro.single("userImage"), async (req, res) => {
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
          "../../template/images/uploads/profile/admin/",
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
      user.profilePicture = req.file.filename;
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
      { title: "win", color: "#28A745" },
      { title: "loss", color: "#DC3545" },
      { title: "held", color: "#007BFF" },
      { title: "pending", color: "#FFC107" },
    ].map(
      (pipelineData) =>
        new pipelineModel({
          uid: newUser._id,
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
        title: "welcome",
        text: "hello dear ! 👋\r\n\r\nWelcome to 360followups! thank you for reaching out to us and showing interest in our services. we're excited to connect with you! our team will be in touch with you shortly to assist you with your needs and provide the best solutions tailored just for you.",
        client: true,
        team: false,
        num: 1,
      },

      {
        title: "after call",
        text: "hello 👋\n\nthank you for taking the time to speak with us today. we truly appreciate your interest in 360followups and are excited to help you achieve your goals.\nif you have any further questions or need assistance, feel free to reach out. we’re here for you!",
        client: true,
        team: false,
        num: 2,
      },

      {
        title: "before call",
        text: "",
        client: false,
        team: false,
        num: 3,
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

  const user = await logIncollection.findById(req.user.id);
  const pipes = await pipelineModel.find({ cid: req.user.cid });

  if (pipes.length > 5) {
    req.session.errorMSG = `you cant add more then 5 pipelines status`;
    return res.redirect("/user/dashboard");
  }

  const pipeline = new pipelineModel({
    uid: user._id,
    color,
    title,
    cid: user.cid,
  });
  await pipeline.save();
  // console.log(pipeline);
  req.session.successMSG = `${title} pipline creation success. `;
  res.redirect("/user/dashboard");
});

router.get("/pipeline/del/:id", isAdminLoggedIn, async (req, res) => {
  const { id } = req.params;
  let pipeline = await pipelineModel.findByIdAndDelete(id);
  // console.log(pipeline);
  req.session.successMSG = `${pipeline.title} pipline deletion sucessfull !. `;
  res.redirect("/user/dashboard");
});
router.get("/pipe/abc", async (req, res) => {
  let pipe = await pipelineModel.findById(req.session.pipe);
  pipe.defaultVal = true;
  await pipe.save();

  delete req.session.pipe;
  req.session.save();

  res.redirect("/user/dashboard");
});
router.post("/pipeline/update/:id", isAdminLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { title, color, defaultVal } = req.body;

  let pipeline = await pipelineModel.findById(id);

  pipeline.color = color;
  pipeline.title = title;

  if (defaultVal == "on") {
    // console.log(defaultVal);
    await pipelineModel.updateMany(
      { uid: req.user.id },
      { $set: { defaultVal: false } }
    );
    req.session.pipe = id;

    await pipeline.save();
    return res.redirect("/user/pipe/abc");
  }
  req.session.successMSG = `${pipeline.title} pipline updatation successfully !. `;
  return res.redirect("/user/dashboard");
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
