
const hbs = require('hbs')

// Register 'gt' (greater than) helper
hbs.registerHelper('gt', function (a, b) {
  return a > b;
});

// Register 'lt' (less than) helper
hbs.registerHelper('lt', function (a, b) {
  return a < b;
});

// Register 'add' helper
hbs.registerHelper('add', function (a, b) {
  return a + b;
});

// Register 'subtract' helper
hbs.registerHelper('subtract', function (a, b) {
  return a - b;
});

hbs.registerHelper("formatDate", function (datetime) {
    if (!datetime) {
      return ""; // Return an empty string if datetime is invalid
    }
    const date = new Date(datetime);
    return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  });
  
  hbs.registerHelper("formatTime", function (datetime) {
    if (!datetime) {
      return ""; // Return an empty string if datetime is invalid
    }
    const date = new Date(datetime);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`; // Format as HH:MM
  });
  
  hbs.registerHelper("countLeadsByStatus", function (leads, pipelineTitle) {
    // Check if leads is defined and is an array
    if (!Array.isArray(leads)) {
      return 0; // Return 0 if leads is not an array
    }
  
    const filteredLeads = leads.filter((lead) => {
      return lead.status && lead.status.title === pipelineTitle;
    });
  
    return filteredLeads.length;
  });
  
  hbs.registerHelper("filterLeadsForMember", function (leads) {
    // Check if leads is defined and is an array
    if (!Array.isArray(leads)) {
      return 0; // Return 0 if leads is not an array
    }
    const filteredLeads = leads.filter(
      (lead) => lead.uid === "" || lead.uid === null
    );
    // console.log(filteredLeads.length);
  
    return filteredLeads;
  });
  
  hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  });
  
  hbs.registerHelper("json", function (context) {
    return JSON.stringify(context);
  });
  
  
  hbs.registerHelper("containsPhoneNumber", function (text) {
    // Regular expression for matching phone numbers
    const phoneNumberPattern = /(\+?\d{1,4}[ -]?)?(\(?\d{2,4}\)?[ -]?)?\d{6,12}/;
    return phoneNumberPattern.test(text);
  });
  