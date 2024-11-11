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



router.get("/template", isAdminLoggedIn, async (req, res) => {
  let user;

  if (req.user.role === "admin") {
    user = await logIncollection.findById(req.user.id);
  } else {
    user = await memberModel.findById(req.user.id);
  }

  let templates = await templateModel.find({ cid: user.cid, num: { $ne: 4 } });
  let specialTemp = await templateModel.find({ cid: user.cid, num: 4 });
  // console.log(templates);

  res.render("template", { user, templates, specialTemp });
});

router.post("/api/verify", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email received:", email);
    let user = await logIncollection.findOne({ email });
    if (!user) user = await memberModel.findOne({ email });

    console.log("User lookup result:", user);
    if (user) {
      return res.status(500).json({ msg: "try with another email !" });
    }

    const otpCode = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log("Generated OTP:", otpCode);
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
    console.log(otpCode);
    res.json({ msg: "mail sent successfully !" });
  } catch (err) {
    console.log("error in /api/verify :- ", err);
    res.status(500).json({ msg: "Server error occurred. Please try again later." }); // Add this line to send a response
  }
});

router.post('/api/otp/verify', (req, res) => {
  try {
    let otp = req.session.otp;
    delete req.session.otp
    let { reqOtp } = req.body;
    console.log(otp, reqOtp);
    if (reqOtp === otp) {
      res.status(200).json({ msg: 'email verification successfully' })
    } else {
      res.status(403).json({ msg: 'otp verification failed' })
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
    user.organizationName = organisation;
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


// router.get("/leads", isAdminLoggedIn, async (req, res) => {
//   try {
//     const { page = 1 } = req.query; // Get the page number from query params, default to 1
//     const limit = 25; // Number of leads per page

//     console.log("leads page");
//     let user;

//     if (req.user.role === "admin") {
//       user = await logIncollection
//         .findById(req.user.id)
//         .populate({
//           path: "myleads",
//           populate: [
//             { path: "status" },
//             { path: "remarks", options: { sort: { createdAt: -1 } } },
//           ],
//         })
//         .populate("teams");
//     } else {
//       user = await memberModel
//         .findById(req.user.id)
//         .populate({
//           path: "myleads",
//           populate: [
//             { path: "status" },
//             { path: "remarks", options: { sort: { createdAt: -1 } } },
//           ],
//         });
//     }

//     // Fetch paginated leads
//     const leads = await leadsModel
//       .find({ cid: user.cid })
//       .populate("status")
//       .populate("uid")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     const totalLeads = await leadsModel.countDocuments({ cid: user.cid });
//     const totalPages = Math.ceil(totalLeads / limit);

//     const pipes = await pipelineModel.find({ cid: user.cid });
//     const members = await memberModel.find({ cid: user.cid });

//     // Render the leads page
//     res.render("leads", {
//       user,
//       leads,
//       pipes,
//       members,
//       currentPage: parseInt(page),
//       totalPages,
//       showPagination: leads.length > 0, // Only show pagination if leads exist
//     });
//   } catch (error) {
//     console.error("Error fetching leads:", error);
//     res.status(500).send("Error fetching leads");
//   }
// });

// router.get("/leads", isAdminLoggedIn, async (req, res) => {
//   try {
//     const { page = 1 } = req.query; // Get the page number from query params, default to 1
//     const limit = 25; // Number of leads per page

//     let user;

//     if (req.user.role === "admin") {
//       user = await logIncollection
//         .findById(req.user.id)
//         .populate({
//           path: "myleads",
//           populate: [
//             { path: "status" },
//             { path: "remarks", options: { sort: { createdAt: -1 } } },
//           ],
//         })
//         .populate("teams");
//     } else {
//       user = await memberModel
//         .findById(req.user.id)
//         .populate({
//           path: "myleads",
//           populate: [
//             { path: "status" },
//             { path: "remarks", options: { sort: { createdAt: -1 } } },
//           ],
//         });
//     }

//     // Fetch paginated leads
//     const leads = await leadsModel
//       .find({ cid: user.cid })
//       .populate("status")
//       .populate("uid")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     // Extract customer name and phone number from leads data
//     const leadsWithCustomerInfo = leads.map(lead => {
//       const customerName = lead.leads_data.find(data => 
//         data.que.toLowerCase().includes("name") || 
//         data.que.toLowerCase().includes("customer name")
//       )?.ans || "Unknown";

//       const customerPhoneNumber = lead.leads_data.find(data => 
//         /^[6-9]\d{9}$/.test(data.ans.trim())
//       )?.ans || "N/A";

//       return {
//         ...lead.toObject(), // Convert lead to plain object
//         customerName,
//         customerPhoneNumber
//       };
//     });

//     const totalLeads = await leadsModel.countDocuments({ cid: user.cid });
//     const totalPages = Math.ceil(totalLeads / limit);

//     const pipes = await pipelineModel.find({ cid: user.cid });
//     const members = await memberModel.find({ cid: user.cid });

//     // Render the leads page with customer information
//     res.render("leads", {
//       user,
//       leads: leadsWithCustomerInfo, // Pass modified leads to the template
//       pipes,
//       members,
//       currentPage: parseInt(page),
//       totalPages,
//       showPagination: leads.length > 0, // Only show pagination if leads exist
//     });
//   } catch (error) {
//     console.error("Error fetching leads:", error);
//     res.status(500).send("Error fetching leads");
//   }
// });
//working fIne for leads section
// router.get("/leads", isAdminLoggedIn, async (req, res) => {
//   try {
//     const { page = 1, customerName, customerPhoneNumber, date } = req.query; 
//     const limit = 25; 

//     let user;
//     if (req.user.role === "admin") {
//       user = await logIncollection
//         .findById(req.user.id)
//         .populate({
//           path: "myleads",
//           populate: [{ path: "status" }, { path: "remarks", options: { sort: { createdAt: -1 } } }],
//         })
//         .populate("teams");
//     } else {
//       user = await memberModel
//         .findById(req.user.id)
//         .populate({
//           path: "myleads",
//           populate: [{ path: "status" }, { path: "remarks", options: { sort: { createdAt: -1 } } }],
//         });
//     }

//     // filter query
//     const filter = { cid: user.cid };
//     if (customerName) {
//       filter['leads_data.ans'] = new RegExp(customerName, 'i'); // Case-insensitive name search
//     }
//     if (customerPhoneNumber) {
//       filter['leads_data.ans'] = customerPhoneNumber;
//     }
//     if (date) {
//       filter.income_time = {
//         $gte: new Date(date).setHours(0, 0, 0),
//         $lt: new Date(date).setHours(23, 59, 59),
//       };
//     }

//     // Fetch leads with filtering and pagination
//     const leads = await leadsModel
//       .find(filter)
//       .populate("status")
//       .populate("uid")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     const leadsWithCustomerInfo = leads.map((lead) => {
//       const customerName = lead.leads_data.find((data) =>
//         data.que.toLowerCase().includes("name") || data.que.toLowerCase().includes("customer name") ||data.que.toLowerCase().includes("आपका_नाम")|| data.que.toLowerCase().includes("नाम")
//       )?.ans || "Unknown";

//       const customerPhoneNumber = lead.leads_data.find((data) =>
//         /^[6-9]\d{9}$/.test(data.ans.trim())
//       )?.ans || "N/A";

//       return { ...lead.toObject(), customerName, customerPhoneNumber };
//     });

//     const totalLeads = await leadsModel.countDocuments(filter);
//     const totalPages = Math.ceil(totalLeads / limit);

//     const pipes = await pipelineModel.find({ cid: user.cid });
//     const members = await memberModel.find({ cid: user.cid });

//     res.render("leads", {
//       user,
//       leads: leadsWithCustomerInfo,
//       pipes,
//       members,
//       currentPage: parseInt(page),
//       totalPages,
//       showPagination: leads.length > 0,
//     });
//   } catch (error) {
//     console.error("Error fetching leads:", error);
//     res.status(500).send("Error fetching leads");
//   }
// });

// router.get("/leads", isAdminLoggedIn, async (req, res) => {
//   try {
//     const { page = 1, customerName, customerPhoneNumber, date, section = "all" } = req.query;
//     const limit = 25;

//     let user;
//     if (req.user.role === "admin") {
//       user = await logIncollection.findById(req.user.id)
//         .populate({
//           path: "myleads",
//           options: { sort: { createdAt: -1 } },
//           populate: [{ path: "status" }, { path: "remarks", options: { sort: { createdAt: -1 } } }],
//         })
//         .populate("teams");
//     } else {
//       user = await memberModel.findById(req.user.id)
//         .populate({
//           path: "myleads",
//           options: { sort: { createdAt: -1 } }, 
//           populate: [{ path: "status" }, { path: "remarks", options: { sort: { createdAt: -1 } } }],
//         });
//     }


//     const filter = { cid: user.cid };
//     if (customerName) {
//       filter['leads_data.ans'] = new RegExp(customerName, 'i');
//     }
//     if (customerPhoneNumber) {
//       filter['leads_data.ans'] = customerPhoneNumber;
//     }
//     if (date) {
//       filter.income_time = {
//         $gte: new Date(date).setHours(0, 0, 0),
//         $lt: new Date(date).setHours(23, 59, 59),
//       };
//     }


//     let leadsSource;
//     if (section === "myleads") {
//       leadsSource = user.myleads.filter(lead => {


//         let matches = true;
//         if (customerName) {
//           matches = matches && lead.leads_data.some(data => new RegExp(customerName, 'i').test(data.ans));
//         }
//         if (customerPhoneNumber) {
//           matches = matches && lead.leads_data.some(data => data.ans === customerPhoneNumber);
//         }
//         if (date) {
//           const incomeDate = new Date(lead.income_time);
//           matches = matches && incomeDate >= new Date(date).setHours(0, 0, 0) && incomeDate < new Date(date).setHours(23, 59, 59);
//         }
//         return matches;
//       });
//     } else {
//       leadsSource = await leadsModel
//         .find(filter)
//         .populate("status")
//         .populate("uid")
//         .sort({ createdAt: -1 })
//         .skip((page - 1) * limit)
//         .limit(limit);
//     }


//     const leadsWithCustomerInfo = leadsSource.map((lead) => {
//       const customerName = lead.leads_data.find((data) =>
//         data.que.toLowerCase().includes("name") ||
//         data.que.toLowerCase().includes("customer name") ||
//         data.que.toLowerCase().includes("आपका_नाम") ||
//         data.que.toLowerCase().includes("नाम")
//       )?.ans || "Unknown";

//       const customerPhoneNumber = lead.leads_data.find((data) =>
//         /^[6-9]\d{9}$/.test(data.ans.trim())
//       )?.ans || "N/A";

//       return { ...lead.toObject(), customerName, customerPhoneNumber };
//     });

//     const totalLeads = section === "myleads" ? leadsWithCustomerInfo.length : await leadsModel.countDocuments(filter);
//     const totalPages = Math.ceil(totalLeads / limit);

//     const pipes = await pipelineModel.find({ cid: user.cid });
//     const members = await memberModel.find({ cid: user.cid });

//     res.render("leads", {
//       user,
//       leads: leadsWithCustomerInfo,
//       myleads: leadsWithCustomerInfo,
//       pipes,
//       members,
//       currentPage: parseInt(page),
//       totalPages,
//       showPagination: leadsWithCustomerInfo.length > 0,
//       activeTab: section, 
//     });
//   } catch (error) {
//     console.error("Error fetching leads:", error);
//     res.status(500).send("Error fetching leads");
//   }
// });


// router.get("/leads", isAdminLoggedIn, async (req, res) => {
//   try {
//     const { 
//       page = 1, 
//       customerName, 
//       customerPhoneNumber, 
//       date, 
//       pageName, 
//       formName, 
//       section = "all" 
//     } = req.query;

//     const limit = 25;
//     let user;

//     if (req.user.role === "admin") {
//       user = await logIncollection.findById(req.user.id)
//         .populate({
//           path: "myleads",
//           options: { sort: { createdAt: -1 } },
//           populate: [{ path: "status" }, { path: "remarks", options: { sort: { createdAt: -1 } } }],
//         })
//         .populate("teams");
//     } else {
//       user = await memberModel.findById(req.user.id)
//         .populate({
//           path: "myleads",
//           options: { sort: { createdAt: -1 } },
//           populate: [{ path: "status" }, { path: "remarks", options: { sort: { createdAt: -1 } } }],
//         });
//     }

//     // Build the filter object
//     const filter = { cid: user.cid };
//     if (customerName) {
//       filter['leads_data.ans'] = new RegExp(customerName, 'i');
//     }
//     if (customerPhoneNumber) {
//       filter['leads_data.ans'] = customerPhoneNumber;
//     }
//     if (date) {
//       filter.income_time = {
//         $gte: new Date(date).setHours(0, 0, 0),
//         $lt: new Date(date).setHours(23, 59, 59),
//       };
//     }
//     if (pageName) {
//       filter.page_name = new RegExp(pageName, 'i');  // Case-insensitive match
//     }
//     if (formName) {
//       filter.form_name = new RegExp(formName, 'i');  // Case-insensitive match
//     }

//     // Fetch leads based on section and filter
//     let leadsSource;
//     if (section === "myleads") {
//       leadsSource = user.myleads.filter(lead => {
//         let matches = true;
//         if (customerName) {
//           matches = matches && lead.leads_data.some(data => new RegExp(customerName, 'i').test(data.ans));
//         }
//         if (customerPhoneNumber) {
//           matches = matches && lead.leads_data.some(data => data.ans === customerPhoneNumber);
//         }
//         if (date) {
//           const incomeDate = new Date(lead.income_time);
//           matches = matches && incomeDate >= new Date(date).setHours(0, 0, 0) && incomeDate < new Date(date).setHours(23, 59, 59);
//         }
//         if (pageName) {
//           matches = matches && new RegExp(pageName, 'i').test(lead.page_name);
//         }
//         if (formName) {
//           matches = matches && new RegExp(formName, 'i').test(lead.form_name);
//         }
//         return matches;
//       });
//     } else {
//       leadsSource = await leadsModel
//         .find(filter)
//         .populate("status")
//         .populate("uid")
//         .sort({ createdAt: -1 })
//         .skip((page - 1) * limit)
//         .limit(limit);
//     }

//     // Add customer information to leads
//     const leadsWithCustomerInfo = leadsSource.map((lead) => {
//       const customerName = lead.leads_data.find((data) =>
//         data.que.toLowerCase().includes("name") ||
//         data.que.toLowerCase().includes("customer name") ||
//         data.que.toLowerCase().includes("आपका_नाम") ||
//         data.que.toLowerCase().includes("नाम")
//       )?.ans || "Unknown";

//       const customerPhoneNumber = lead.leads_data.find((data) =>
//         /^[6-9]\d{9}$/.test(data.ans.trim())
//       )?.ans || "N/A";

//       return { ...lead.toObject(), customerName, customerPhoneNumber };
//     });

//     const totalLeads = section === "myleads" ? leadsWithCustomerInfo.length : await leadsModel.countDocuments(filter);
//     const totalPages = Math.ceil(totalLeads / limit);

//     const pipes = await pipelineModel.find({ cid: user.cid });
//     const members = await memberModel.find({ cid: user.cid });
// // console.log(leadsWithCustomerInfo);
// user.myleads.forEach(lead => {
//   console.log("Lead ID:", lead.lead_id);
//   console.log("Leads Data:", JSON.stringify(lead.leads_data, null, 2));
// });


//     res.render("leads", {
//       user,
//        myleads: leadsWithCustomerInfo,
//       leadsWithCustomerInfo,
//       leads: leadsWithCustomerInfo,

//       pipes,
//       members,
//       currentPage: parseInt(page),
//       totalPages,
//       showPagination: leadsWithCustomerInfo.length > 0,
//       activeTab: section,
//     });
//   } catch (error) {
//     console.error("Error fetching leads:", error);
//     res.status(500).send("Error fetching leads");
//   }
// });

router.get("/leads", isAdminLoggedIn, async (req, res) => {
  try {
    const {
      page = 1,
      customerName,
      customerPhoneNumber,
      date,
      pageName,
      formName,
      section = "all"
    } = req.query;

    const limit = 25;
    let user;

    if (req.user.role === "admin") {
      user = await logIncollection.findById(req.user.id)
        .populate({
          path: "myleads",

          populate: [
            { path: "status" },
            { path: "remarks", options: { sort: { createdAt: -1 } } }
          ],
        })
        .populate("teams");
    } else {
      user = await memberModel.findById(req.user.id)
        .populate({
          path: "myleads",

          populate: [
            { path: "status" },
            { path: "remarks", options: { sort: { createdAt: -1 } } }
          ],
        });
    }
    let admin = logIncollection.findOne({cid: user.cid})
    if (admin.facebookToken === null || admin.facebookToken === undefined || admin.facebookToken === '') {
      // await new Promise(resolve => setTimeout(resolve, 5000));  // 5 seconds delay
      // console.log("you not have fb token");
      req.session.errorMSG = `Facebook Account Not Connected. Please Connect to Find New Leads.`;
    
    }
    let ALLLEADS = await leadsModel.find({cid: user.cid})
    // Build the filter object
    const filter = { cid: user.cid };
    if (customerName) {
      filter['leads_data.ans'] = new RegExp(customerName, 'i');
    }
    if (customerPhoneNumber) {
      filter['leads_data.ans'] = customerPhoneNumber;
    }
    if (date) {
      filter.income_time = {
        $gte: new Date(date).setHours(0, 0, 0),
        $lt: new Date(date).setHours(23, 59, 59),
      };
    }
    if (pageName) {
      filter.page_name = new RegExp(pageName, 'i');
    }
    if (formName) {
      filter.form_name = new RegExp(formName, 'i');
    }

    // Fetch leads based on section and filter
    let leadsSource;
    if (section === "myleads") {
      leadsSource = user.myleads.filter(lead => applyFilters(lead, req.query));
    } else {
      leadsSource = await leadsModel
        .find(filter)
        .populate("status")
        .populate("uid")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

    // Ensure leadsSource is properly populated and mapped
    const leadsWithCustomerInfo = leadsSource.map((lead) => {
      const customerName = extractCustomerName(lead);
      const customerPhoneNumber = extractCustomerPhone(lead);

      // console.log(`Lead ID: ${lead._id}, Name: ${customerName}, Phone: ${customerPhoneNumber}`);

      // Return a consistent structure
      return { ...lead.toObject(), customerName, customerPhoneNumber };
    });

    // console.log("User Leads:", leadsWithCustomerInfo);

    const totalLeads = section === "myleads" ? leadsWithCustomerInfo.length : await leadsModel.countDocuments(filter);
    const totalPages = Math.ceil(totalLeads / limit);

    const pipes = await pipelineModel.find({ cid: user.cid });
    const members = await memberModel.find({ cid: user.cid });

    let msg = req.session.successMSG;
    // console.log(req.session.successMSG);
    let errMsg = req.session.errorMSG;
    let warnMsg = req.session.warnMsg;

    delete req.session.successMSG;
    delete req.session.errorMSG;
    delete req.session.warnMsg;
    // user.myleads.forEach(elem => console.log(elem._id + "====="))

    // let userMyLeads = user.myleads
    let userMyLeads = [...user.myleads].reverse();
    // userMyLeads.forEach(elem => console.log(elem._id))
    // console.log(leadsWithCustomerInfo.length);
    const Membersleads = await leadsModel.find({cid: user.cid, $or: [{ uid: null },{ uid: user._id }]}) .sort({ createdAt: -1 });

    res.render("leads", {
      user,
      userMyLeads,
      leadsWithCustomerInfo,
      myleads: leadsWithCustomerInfo,
      leads: leadsWithCustomerInfo,
      pipes,
      Membersleads,
      ALLLEADS,
      members,
      currentPage: parseInt(page),
      totalPages,
      showPagination: leadsWithCustomerInfo.length > 0,
      activeTab: section,
      successMSG: msg,
      errorMSG: errMsg,
      warnMSG: warnMsg,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).send("Error fetching leads");
  }
});

// Helper function to filter leads based on query parameters
function applyFilters(lead, query) {
  const { customerName, customerPhoneNumber, date, pageName, formName } = query;
  let matches = true;

  if (customerName) {
    matches = matches && lead.leads_data.some(data =>
      new RegExp(customerName, 'i').test(data.ans)
    );
  }
  if (customerPhoneNumber) {
    matches = matches && lead.leads_data.some(data =>
      data.ans === customerPhoneNumber
    );
  }
  if (date) {
    const incomeDate = new Date(lead.income_time);
    matches = matches && incomeDate >= new Date(date).setHours(0, 0, 0) &&
      incomeDate < new Date(date).setHours(23, 59, 59);
  }
  if (pageName) {
    matches = matches && new RegExp(pageName, 'i').test(lead.page_name);
  }
  if (formName) {
    matches = matches && new RegExp(formName, 'i').test(lead.form_name);
  }

  return matches;
}



function extractCustomerName(lead) {
  // console.log("Inspecting leads_data for lead:", lead.lead_id, lead.leads_data);

  if (!Array.isArray(lead.leads_data)) {
    // console.warn("leads_data is not an array for lead:", lead.lead_id);
    return "Unknown";
  }

  const nameData = lead.leads_data.find((data) =>
    /name|customer name|आपका_नाम|नाम/i.test(data.que)
  );

  // console.log("Extracted Name Data:", nameData);
  return nameData?.ans || "Unknown";
}


function extractCustomerPhone(lead) {
  // console.log("Inspecting leads_data for phone:", lead.lead_id, lead.leads_data);

  if (!Array.isArray(lead.leads_data)) {
    // console.warn("leads_data is not an array for lead:", lead.lead_id);
    return "N/A";
  }

  const phoneData = lead.leads_data.find((data) =>
    /(\+?\d{1,4}[ -]?)?(\(?\d{2,4}\)?[ -]?)?\d{6,12}/.test(data.ans.trim())
  );

  // console.log("Extracted Phone Data:", phoneData);
  return phoneData?.ans || "N/A";
}


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
