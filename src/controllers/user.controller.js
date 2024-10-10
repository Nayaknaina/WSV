const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const logIncollection = require("../models/admin.model");
const memberModel = require("../models/member.model");
const leadsModel = require("../models/leads.model");

const csvFileDataChangIntoLeadHandler = async (req, res) => {
    let user;
    if (req.user.role === 'admin') {
        user = await logIncollection.findById(req.user.id)
    }else{
        user = await memberModel.findById(req.user.id)
    }
  if (req.file) {
    const results = [];
    const filePath = path.join(__dirname, "../../template/images/uploads/csv", req.file.filename);

    // Read and parse the CSV file
    fs.createReadStream(filePath)
      .pipe(csv()) // Parse the CSV file row by row
      .on("data", (row) => {
        const leadRow = Object.keys(row).map((heading) => {
          return {
            _id: false,
            que: heading,
            ans: row[heading],
          };
        });

        // Push the parsed data and add additional fields
        results.push({
          lead_id: ``,
          cid: user.cid,
          income_time: new Date(),
          app: "csv",
          leads_data: leadRow,
        });
      })
      .on("end", async () => {
        try {
          // Save all parsed data into the database
          const insertedLeads = await leadsModel.insertMany(results); // Bulk insert all leads

          //todo After saving, delete the uploaded CSV file
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            } else {
              console.log("File successfully deleted:", filePath);
            }
          });

          res.status(200).json({
            msg: "CSV file parsed and leads saved to the database!",
            insertedLeads, // Return the inserted leads for confirmation
          });

        } catch (error) {
          console.error("Error saving leads to the database:", error);
          res.status(500).send("Error saving leads to the database.");
        }
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error);
        res.status(500).send("Error processing CSV file.");
      });
  } else {
    res.status(400).send("Please upload a valid CSV file.");
  }
};

module.exports = {
  csvFileDataChangIntoLeadHandler,
};