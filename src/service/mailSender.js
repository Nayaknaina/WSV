const nodeMail = require('nodemailer')

async function sendMail(userEmail, msg, subject='360followups') {
    const transporter = nodeMail.createTransport({
        service: 'gmail',
        auth:{
            user: '360followups@gmail.com',
            pass: process.env.MAIL_SECRET,
        }
    })

    const mailOption = {
        from: '360followups@gmail.com',
        to: userEmail,
        subject: subject,
        text: msg,
    }

    try {
        const result = await transporter.sendMail(mailOption)
        console.log("mail send sucessfully");
        return result;
    } catch (err) {
        console.log('mail send failed with error', err);
    }
}

module.exports = {
    sendMail,
}