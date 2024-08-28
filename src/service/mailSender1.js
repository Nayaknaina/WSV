const nodemailer = require('nodemailer');

// Create transporter using Zoho SMTP
let transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: 'worksuite@websoftvalley.com', // Your Zoho email
    pass: 'exTnuNrDfXuF' // Your app-specific password
  },
  debug:true,
  logger:true
});

// Send email function
const sendEmail = async () => {
  try {
    let info = await transporter.sendMail({
      from: 'worksuite@websoftvalley.com', // Sender address
      to: 'karanghorse91@gmail.com', // List of recipients
      subject: 'Test Email', // Subject line
      text: 'Hello, this is a test email sent using Zoho SMTP and Nodemailer!', // Plain text body
      
    });
    
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Call the sendEmail function
sendEmail();


// PWD: 

// Mail host: smtppro.zoho.in

// Port: 587