const mongoose = require(`mongoose`);


const FlightSchema = new mongoose.Schema({
    Full_name: {
        type:String,
        required:true
    },
    EmailAddress : {
        type:String,

    },
    Location: {
        type: String,
    },
    Ticket_type : {
        type : String,
    },
    Ticket_price: {
        type: String,
    },
    Nationality: {
        type:String,
    },
    Present_Country: {
        type:String,
    },
    Destination_Country:{
        type:String,
    }  
},{
    versionkey: false,
    timestamp : true
}
);


const FlightUserSchema = mongoose.model(`FlightUserSchema`,FlightSchema);


module.exports = FlightUserSchema;