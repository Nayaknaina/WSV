
const logIncollection = require("../models/admin.model");
const leadsModel = require("../models/leads.model");
const router = require("./members.route");
const { isAdminLoggedIn } = require("../middilware/middilware.js");
const templateModel = require("../models/temlate.model.js");
const path = require("path");
const fs = require('fs');
const readJsonFile = () => {
  const filePath = "./src/generated_data.json";
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data); // Return the parsed JSON data
};

router.get("/get/data", isAdminLoggedIn, async (req, res) => {
    const admin = await logIncollection.findById(req.user.id);
    let allLeads = readJsonFile();
  
    if (!admin) {
      return res.redirect("/login");
    }
  
    console.log(allLeads.length);
  
    allLeads.forEach(async (lead) => {
      const perLead = await leadsModel.findOne({ lead_id: lead.id });
  
      if (!perLead) {
        let leads_datas = [];
  
        lead.field_data.forEach((data) => {
          leads_datas.push({ que: data.name, ans: data.values[0] });
        });
  
        const newLead = new leadsModel({
          lead_id: lead.id,
          page_id: lead.page_id,
          form_id: lead.form_id,
          income_time: lead.created_time,
          cid: admin.cid,
          leads_data: leads_datas,
          app: "facebook",
        });
        await newLead.save();
        console.log("data created");
      }
    });
  
    res.redirect("/leads");
  });
  

  router.get("/make/temp", isAdminLoggedIn, async (req, res) => {
    
    let user = await logIncollection.findById(req.user.id);
    const templates = [
      {
        title: "Reminder Message To Customer",
        text: `Dear [Customer Name],
  
  This is a friendly reminder from [Company].
  We have a scheduled follow-up 
  call with you on [Date] at [Time].
  Our representative will be 
  reaching out to discuss your requirements.
  
  If you have any questions or need to reschedule,
  please feel free to let us know.
  
  Looking forward to speaking with you!
  
  Best Regards,
  The [Company] Team`,
        client: true,
        team: false,
        num: 1,
      },
  
      {
        title: "Reminder Message To Team Member",
        text: `Hello [Team Member Name],
  
  Just a reminder that you have a follow-up 
  call scheduled with [Customer Name] 
  on [Date] at [Time].
  Please make sure you are prepared 
  with all the necessary details.
  
  Good luck with the call, and let us 
  know if you need any assistance!
  
  Best Regards,
  The [Company] System`,
        client: false,
        team: true,
        num: 2,
      },
  
      {
        title: "Thankyou Message To Customer",
        text: `Dear [Customer Name],
  
  Thank you for taking the time 
  to speak with us today.
  We appreciate the opportunity 
  to understand your needs 
  better and to discuss how we 
  can assist you further.
  
  If you have any questions or 
  need more information, 
  please don’t hesitate to reach out. 
  We look forward to continuing our 
  conversation and helping you achieve
  your goals.
  
  Best Regards,
  The [Company] Team`,
        client: true,
        team: false,
        num: 5,
      },
  
      {
        title: "Notification Message To Team Members",
        text: `Hello [Team Member Name],
  
  A new lead has been added to the CRM.
  Here are the details:-
  
  Lead Name: [Customer Name]
  Contact Number: [Customer Contact Number]
  Date Received: [Date]
  Lead Source: [Lead Source]
  
  Please follow up with the lead at your earliest 
  convenience to ensure a prompt response.
  
  Best,
  The [Company] System`,
        client: false,
        team: true,
        num: 3,
      },
  
      {
        title: "Wellcome Message To Customer",
        text: `Dear [Customer Name],
  
  Welcome to [Company]! 
  We’re thrilled to have you on board. 
  Our team will be reaching out to you shortly 
  to understand your needs and help you find the 
  best solutions.
  
  If you have any immediate questions, 
  feel free to get in touch with us. 
  
  We're here to support you every step of the way!
  
  Best Regards,
  The [Company] Team`,
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
  
    res.redirect("/user/dashboard");
  });


  module.exports = router;