const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
const FlightAuth = require("../Models/Flight.auth.models");
const sendEmail = require(`../Config/Email`);



const SignUp = async (req,res) => {
    const {name,username,email,password} = req.body;
    try{
        if(!name||!username||!email||!password) {
            return res.status(409).json({message:`All fields are required`});
        }
        const ExistingUser = await FlightAuth.findOne({email});
        if(ExistingUser){
            return res.status(401).json({message:`User already existed`})
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otp_Expiry = new Date(Date.now() + 10 * 60 * 1000);
        const NewUser = new FlightAuth({
            name,
            username,
            email,
            password: hashedpassword,
            otp,
            otp_Expiry
        });
        // await sendEmail(
        //     email,
        //     "Welcome to Airline flight booking applications,please verify your signup",
        //     `Here is verification otp:${otp}`
        // );
        await NewUser.save();
        return res.status(200).json({messsage:`Signup successfull,check your email for otp verification`,otp});
    }catch(error) {
        console.error(`Failed to signup on this flight Application`,error);
        return res.status(500).json({message:`Internal server error`});
    }
}

const Login = async (req,res) => {
    const {email,password} = req.body;
    try {
        if(!email||!password) {
            return res.status(409).json({message:`All fields are required`})
        }
        const ComparedEmail = await FlightAuth.findOne({email});
        if(!ComparedEmail) {
            return res.status(400).json({message:`User not Found`});
        }
        const ComparedPassword = await  bcrypt.compare(password,ComparedEmail.password);
        if(!ComparedPassword) {
            return res.status(400).json({message:`Invalid passsword`})
        }
        if(!ComparedEmail.isVerified) {
            return res.status(401).json({message:`User not verified, please verify your account`});
        }
        const token = jwt.sign({User_id:ComparedEmail.id},process.env.JWT_SECRET,{expiresIn:"1hr"});
            return res.status(200).json({message:`Login successfull`,token});
    }catch(error) {
        console.error(`Failed to Login into in flight application`);
        return res.status(500).json({message:`Internal server error`});
    }
}

const OTPverification = async (req,res) => {
    const {otp} = req.body;
    try{
        if(!otp) {
            return res.status(409).json({message:`OTP is required`});
        }
        const VerifyOTP = await FlightAuth.findOne({otp})
        if(!VerifyOTP) {
            return res.status(409).json({message:`OTP not found`})
        }
        if(VerifyOTP.otp_Expiry < Date.now()) {
            return res.status(400).json({message:`expired OTP`});
        }
        VerifyOTP.isVerified = true;
        VerifyOTP.otp = null;
        VerifyOTP.otp_Expiry = null;
        await VerifyOTP.save();
        return res.status(200).json({message:`OTP verified successfully`});
    }catch(error) {
        console.log(`Failed to verify OTP`,error);
        return res.status(500).json({message:`Internal server error`});
    }
}

const ResendOTP = async (req,res) => {
    const {email} = req.body;
    try {
        if(!email) {
            return res.status(409).json({message:`User email is required`});
        }
        const resendOTP = await FlightAuth.findOne({email})
            if(!resendOTP){
                return res.status(400).json({message:`user not found`});
            }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otp_Expiry = new Date(Date.now() + 10 * 60 * 1000);
        resendOTP.otp = otp;
        resendOTP.otp_Expiry = otp_Expiry;
        //  await sendEmail(
        //     email,
        //     "Welcome to Airline flight booking applications,we've resend the otp",
        //     `check your resent otp:${otp}`
        // );
        await resendOTP.save();
        return res.status(200).json({message:`OTP resent successfully`,otp});
    }catch(error) {
        console.error(`Failed to resend OTP`);
        return res.status(500).json({message:`Internal server error`});
    }
}  

const ForgotPassword = async (req,res) => {
    const {email} = req.body;
    try{
        if(!email) {
            return res.status(409).json({message:`email is required`});
        }
        const Recoveredpassword = await FlightAuth.findOne({email})
        if(!Recoveredpassword){
            return res.status(401).json({message:`user email not found`});
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otp_Expiry = new Date(Date.now() + 10 * 60 * 1000);
        Recoveredpassword.otp = otp;
        Recoveredpassword.otp_Expiry = otp_Expiry;
        //  await sendEmail(
        //     email,
        //     "Welcome to Airline flight booking applications,please check your otp forgot password",
        //     `Here is your forgot password otp:${otp}`
        // );
        await Recoveredpassword.save();
        return res.status(200).json({message:`otp sent successfully`,otp});
    }catch(error) {
        console.error(`Failed in recovering your password`)
        return res.status(500).json({message:`Internal server error`});
    }
}

const ResetPassword = async (req,res) => {
    const {otp,newPassword} = req.body;
    try{
        if(!otp||!newPassword){
            return res.status(400).json({message:`All fields are required`});
        }
        const Reset = await FlightAuth.findOne({otp});
        if(!Reset) {
            return res.status(409).json({message:`OTP not found`})
        }
        if(Reset.otp_Expiry < Date.now()){
            return res.status(409).json({messsage:`OTP expired`});
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        Reset.password = hashedPassword;
        await Reset.save();
        return res.status(200).json({message:`Password reset successfully`});
    }catch(error) {
        console.error(`Failed to reset password`)
        return res.status(500).json({message:`internal server error`});
    }
}


const GetAlluser = async (req,res) => {
    const {User_id} = req.user;
    const AdminVerification = await FlightAuth.findById(User_id);
    if(AdminVerification.role !=="admin") {
        return res.status(401).json({message:`Access denied`});
    }
    try{
        const Alluser = await FlightAuth.find().select(`-otp,-password,-otp_Expiry`);
        return res.status(200).json({message:`Here are all the user`,Alluser});
    }catch(error) {
        console.error(`Failed to get all Users`);
        return res.status(500).json({message:`Internal server error`});
    }
}

module.exports = {SignUp,Login,OTPverification,ResendOTP,ForgotPassword,ResetPassword,GetAlluser};
