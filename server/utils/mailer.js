const transporter = require('../config/mailTransporter')

async function sendEmail(receiver, subject, text) {
    const emailOption = {
        from: {
            name: "Staynesia",
            address: process.env.MAILER_USERNAME
        },
        to: receiver,
        subject, subject,
        text: text
    }

    return await transporter.sendMail(emailOption)
}
module.exports = { sendEmail }