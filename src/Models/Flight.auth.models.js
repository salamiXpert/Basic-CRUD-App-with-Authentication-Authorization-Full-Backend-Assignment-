const mongoose = require(`mongoose`);


const FlightAuthSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    otp: {
        type:String
    },
    otp_Expiry: {
        type:Date,
    },
    isVerified: {
        type:String,
        default: false
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{
    timestamp:true,
    versionkey:false
});


const FlightAuth = mongoose.model(`FlightAuth`,FlightAuthSchema);

module.exports = FlightAuth;