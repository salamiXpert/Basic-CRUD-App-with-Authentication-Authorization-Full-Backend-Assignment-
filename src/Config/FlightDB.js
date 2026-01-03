const mongoose = require(`mongoose`);

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Flight_UserDB";

const ConnectUserDB = async (req,res) => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`Flight user database connected Successfully`);
    }catch(error) {
        console.log(`Flight User Database  failed to connceted `,error);
        process.exit(1);
        return res.status(500).json({message:`Internal server error`});
    }
}


module.exports = ConnectUserDB;