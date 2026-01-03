const nodemailer = require(`nodemailer`);

const Transporter = nodemailer.createTransport({
    host: `smtp.gmail.com`,
    port: 587,
    secure: false,

    auth: {
        user: `salamiemmanuel012@gmail.com`,
        pass: `krivhwvovsxedbps`,
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