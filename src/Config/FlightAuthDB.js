const mongoose = require(`mongoose`);


const MONGO_URI = process.env. MONGO_URI || "mongodb://localhost:27017/Flight_UserDB";
const ConnectAuthDB = async (req,res) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Flight Authentication Database connected successfully`);  
    }catch(error){
        console.log(`Flight Authentication Database Failed to connect`,error);
        process.exit(1);
    }
}

module.exports = ConnectAuthDB;