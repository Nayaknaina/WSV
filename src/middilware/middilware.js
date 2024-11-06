const jwt = require("jsonwebtoken");
const memberModel = require("../models/member.model.js");
const leadsModel = require("../models/leads.model.js");
const WaModel = require("../models/wA.model.js");
const logIncollection = require('../models/admin.model.js')
const templateModel = require('../models/temlate.model.js')
const path = require('path')
const axios = require("axios");
const {  MessageMedia } = require("whatsapp-web.js");

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



let findNewLeadCount = 0;
async function findNewLead(accessToken, user) {
  console.log(findNewLeadCount, "aagyi lead");
  findNewLeadCount++;
  let admin;
  try {
    admin = await logIncollection.findOne({ cid: user.cid });
  } catch (err) {
    console.error("Error fetching admin: ", err);
    return;
  }

  if (!admin) {
    console.error("Admin not found.");
    return;
  }

  let connStatus;
  try {
    connStatus = await WaModel.findOne({ cid: admin.cid });
  } catch (err) {
    console.error("Error fetching connStatus: ", err);
    return;
  }

  if (!connStatus) {
    console.error("connStatus not found.");
    return;
  }
  let allNewLeads = [];
  const pagesResponse = await axios.get(
    `https://graph.facebook.com/v20.0/me/accounts`,
    {
      params: {
        access_token: accessToken, fields: "id,name,access_token"
      },
    }
  );

  const pages = pagesResponse.data.data;
  console.log("Total pages fetched:", pages.length);
  if (!pages.length) console.warn("No pages available for this account.");

  let allLeads = [];

  for (const page of pages) {
    console.log(`Processing page: ${page.name} (ID: ${page.id})`);

    try {
      const leadFormsResponse = await axios.get(
        `https://graph.facebook.com/v20.0/${page.id}/leadgen_forms`,
        {
          params: { access_token: page.access_token, fields: "id,name" },
        }
      );

      const leadForms = leadFormsResponse.data.data;
      // console.log(
      //   `Forms fetched for page ${page.name}: ${leadForms.length}`
      // );

      // Loop through each form to fetch leads
      for (const form of leadForms) {
        // console.log(
        //   `Fetching leads for form: ${form.name} (ID: ${form.id})`
        // );

        try {
          const leadsResponse = await axios.get(
            `https://graph.facebook.com/v20.0/${form.id}/leads`,
            {
              params: {
                access_token: page.access_token,
                fields: "id,created_time,field_data",
              },
            }
          );

          const leads = leadsResponse.data.data;
          // console.log(
          //   `Total leads fetched for form ${form.name}: ${leads.length}`
          // );


          leads.forEach((lead) => {
            allLeads.push({
              ...lead, // Include original lead data
              page_id: page.id,
              page_name: page.name,
              form_id: form.id,
              form_name: form.name,
            });
          });


          if (leadsResponse.data.paging?.next) {
            console.log(
              `Pagination detected. Next page URL: ${leadsResponse.data.paging.next}`
            );
          }
        } catch (err) {
          console.error(
            `Error fetching leads for form ${form.name}:`,
            err.message
          );
        }
      }
    } catch (err) {
      console.error(`Error fetching forms for page ${page.name}:`, err.message);
    }
  }

  allLeads.forEach(async (lead) => {
    const existingLead = await leadsModel.findOne({ lead_id: lead.id, cid: admin.cid });

    if (!existingLead) {
      console.log("new lead found", lead);

      let leads_datas = [];

      lead.field_data.forEach((data) => {
        leads_datas.push({
          que: data.name,
          ans: data.values[0]
        });
      });

      // let defPipe = await pipelineModel.findOne({ num: 4 ,cid:user.cid});
      const newLead = new leadsModel({
        lead_id: lead.id,
        income_time: lead.created_time,
        page_id: lead.page_id,
        page_name: lead.page_name,
        form_id: lead.form_id,
        form_name: lead.form_name,
        cid: admin.cid,
        leads_data: leads_datas,
        // status: defPipe._id,
        app: "facebook",
      });
      await newLead.save();

      const mobileRegex = /^[6-9]\d{9}$/;
      let leadContactNo;
      newLead.leads_data.forEach((item) => {
        const answer = item.ans.trim();

        if (mobileRegex.test(answer)) {
          console.log("Valid Mobile Number found:", answer);
          leadContactNo = answer;
        }
      });

      console.log(leadContactNo);
      // leadContactNo = "9755313770";

      const searchStrings = [
        "name",
        "your name",
        "आपका_नाम",
        "Customer Name",
        "customerName",
        "customer name",
        "customername",
        "customer_name",
        "full name",
        "first name",
        "आपका नाम",
        "नाम",
        "पूरा नाम",
        "पूरा_नाम",
        "ग्राहक का नाम",
        "ग्राहक_का_नाम",
        "शुभ नाम",
        "शुभ_नाम",
      ];

      let customerName = "";

      newLead.leads_data.forEach((item) => {
        const isMatch = searchStrings.some((str) =>
          item.que.toLowerCase().includes(str.toLowerCase())
        );
        if (isMatch) {
          customerName = item.ans;
        }
      });

      if (customerName) {
        console.log("Matched customerName:", customerName);
      } else {
        customerName = "Sir/Madam";
        console.log("Un-Matched then customerName:", customerName);
      }

      const wellcomeTemp = await templateModel.findOne({
        cid: admin.cid,
        num: 4,
      });

      // todo COUSTOMER Whatsapp Message
      setTimeout(() => {
        let imagePath, pdfPath;
        if (wellcomeTemp.image !== "") {
          imagePath = path.join(
            __dirname,
            "../template/images/uploads/whatsapp/",
            wellcomeTemp.image
          );
        }
        if (wellcomeTemp.pdf !== "") {
          pdfPath = path.join(
            __dirname,
            "../template/images/uploads/whatsapp/",
            wellcomeTemp.pdf
          );
        }
        console.log("find new lead function auto call");

        let msg = wellcomeTemp.text;

        let companyName =
          admin.organizationName !== null ||
            admin.organizationName !== 'undefined' ||
            admin.organizationName !== ''
            ? admin.organizationName
            : "360FollowUps";

        let personalizedMessage = msg
          .replace("[customer name]", customerName)
          .replace("[company name]", companyName)
          .replace("[company name]", companyName);

        // console.log(
        //   connStatus,
        //   leadContactNo,
        //   personalizedMessage,
        //   imagePath,
        //   pdfPath
        // );
        personalizedMessage = capitalizeText(personalizedMessage);
        sendMessageToLead(
          connStatus,
          leadContactNo,
          personalizedMessage,
          imagePath,
          pdfPath
        );
      }, 5000);

      // todo COUSTOMER Whatsapp Message for members
      const notificationTemp = await templateModel.findOne({
        cid: admin.cid,
        num: 3,
      });
      setTimeout(async () => {
        let msg = notificationTemp.text;

        let companyName =
          admin.organizationName !== null ||
          admin.organizationName !== '' ||
            admin.organizationName !== undefined
            ? admin.organizationName
            : "360FollowUps";
        const today = new Date();

        const day = String(today.getDate()).padStart(2, "0"); // Din (2 digits)
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Month (0-based index, isliye +1)
        const year = today.getFullYear(); // Year

        const formattedDate = `${day}-${month}-${year}`;

        // todo new lead found msg to Admin
        let personalizedMessage = msg
          .replace("[team member name]", admin.name)
          .replace("[customer name]", customerName)
          .replace("[customer contact number]", customerName)
          .replace("[date]", formattedDate)
          .replace("[lead source]", "facebook")
          .replace("[company name]", companyName);
          personalizedMessage = capitalizeText(personalizedMessage);
        sendMessageToLead(connStatus, admin.mobile, personalizedMessage);

        // todo new lead found msg to all Members
        let users = await memberModel.find({ cid: admin.cid })
        for (let i = 0; i < users.length; i++) {
          setTimeout(() => {
            let personalizedMessage = msg
              .replace("[team member name]", users[i].name)
              .replace("[customer name]", customerName)
              .replace("[customer contact number]", customerName)
              .replace("[date]", formattedDate)
              .replace("[lead source]", "facebook")
              .replace("[company name]", companyName);
              personalizedMessage = capitalizeText(personalizedMessage);
            sendMessageToLead(connStatus, users[i].mobile, personalizedMessage);
          }, 2000);
        }
      }, 2500);

      allNewLeads.push(newLead);

      // console.log(leads_datas);

      // Send WhatsApp message to admin and members
      // const adminNumber = user.user.phoneNumber;
      // const adminName = user.user.name;
      // const message = `A new lead has been added:\n\nLead ID: ${lead.lead_id}\nIncome Time: ${lead.income_time}\nApp: ${lead.app}`;
      // sendMessageToLead('919755313770@c.us', `${adminName}, ${message}`);
      // sendMessageToLead(adminNumber, `${adminName}, ${message}`);

      // Get members of the admin
      // const members = await memberModel.find({ cid: user.user.cid });
      // members.forEach((member) => {
      //   const memberNumber = member.phoneNumber;
      // sendMessageToLead(memberNumber, `${adminName} added a new lead: ${lead.lead_id}`);
      // sendMessageToLead(memberNumber, `added a new lead:`);

      // });

      // console.log(leads_datas);
    }
  });

  return allLeads;
}

let chalteRahoId;
function chalteRaho(token, user) {
  let i = 0;

  chalteRahoId = setInterval(() => {
    findNewLead(token, user);
    console.log("step", i++);
  }, 60000);
}


// todo Middleware to check subscription status

async function checkSubscription(req, res, next) {
  let Admin = await logIncollection.findOne({cid: req.user.cid})
  
  const subExp = new Date(Admin.subscriptionExpiry); // Assuming `subscriptionExpiry` is stored in user data
  const today = new Date();
  const diffTime = subExp - today;
  const daysLeft = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  req.session.access = daysLeft > 0; // true if subscription is active, false if expired
  console.log(req.session.access,"in a check Subscription");
  
  next();
}

function capitalizeText(text) {
  return text.replace(/(^\w{1}|\.\s*\w{1}|\*\w{1})/gm, (char) => char.toUpperCase());
}

function findMobileNumber(data) {
  let mobileRegex = /^(\+\d{1,3})?\s?[6-9]\d{9}$/;

  // for (const item of data) {
  //   const answer = item.ans.trim();
  //   if (mobileRegex.test(answer)) {
  //     console.log("Valid Mobile Number found:", answer);
  //     return answer; // First valid mobile number is returned
  //   }
  // }
let mobile = null;
  // data.forEach((item) => {
  //   console.log(item)
  //     const answer = item.ans.trim();
  //     console.log(answer);
      
  //     if (mobileRegex.test(answer)) {
  //       console.log("Valid Mobile Number found:", answer);
  //       mobile = answer
  //       return mobile;
  //     }
  //   })

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      console.log(item);
      
      const answer = item.ans.trim();
      console.log(answer);
      
      if (mobileRegex.test(answer)) {
        console.log("Valid Mobile Number found:", answer);
        mobile = answer;
        return mobile; // Valid mobile number mil gaya toh loop se exit karne ke liye break use kiya
      }
    }

    if (mobile === null) {
      mobileRegex = /^[6-9]\d{9}$/;
      data.forEach((item) => {
        const answer = item.ans.trim();
  
        if (mobileRegex.test(answer)) {
          console.log("Valid Mobile Number without country code found:", answer);
          mobile = answer
          return mobile;
        }
      })
    }
  console.warn("No valid mobile number found.");
  return null;
}

module.exports = {
 
  isAdminLoggedIn,
  isMemberLoggedIn,
  isMemberBlocked,
  isSubscriptionValid,
  chalteRahoId,
  chalteRaho,
  checkSubscription,
  capitalizeText,
  findMobileNumber,
}