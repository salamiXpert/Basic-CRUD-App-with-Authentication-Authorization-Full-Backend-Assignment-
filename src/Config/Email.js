const nodemailer = require(`nodemailer`);

const Transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const sendEmail = async (to,subject,text) => {
    const mailOptions = {
        from:process.env.EMAIL_FROM,
        to,
        subject,
        text
    };
    await Transporter.sendMail(mailOptions)
    console.log(`Email sent to`,to);
}


module.exports = sendEmail;
