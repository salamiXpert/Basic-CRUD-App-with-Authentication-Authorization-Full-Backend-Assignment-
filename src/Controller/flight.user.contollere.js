const mongoose = require( `mongoose`);
const FlightUserSchema = require("../Models/Flight.user.models");


const RegisterFlight = async (req,res) => {
    const {Full_name,
        EmailAddress,
        Location,
        Ticket_type,
        Ticket_price,
        Nationality,
        Present_Country,
        Destination_Country} = req.body;
    try {
        if(!Full_name||
        !EmailAddress||
        !Location||
        !Ticket_type||
        !Ticket_price||
        !Nationality||
        !Present_Country||
        !Destination_Country) {
            return res.status(400).json({message:`All fields are required`})
        }
    const NewRegistration =  new FlightUserSchema({Full_name,
        EmailAddress,
        Location,
        Ticket_type,
        Ticket_price,
        Nationality,
        Present_Country,
        Destination_Country});
    await NewRegistration.save();
    return res.status(201).json({message:`Flight registered Successfully,proceed to print your flight documents`});

    }catch(error) {
        console.error(`Failed to register Flight`);
        return res.status(500).json({message:`Internal server error`});
    }
}



const AllFlightRecords = async (req,res) => {
    try {
        const GetAllFlightRecords = await FlightUserSchema.find();
        if(!GetAllFlightRecords){
            return res.status(400).json({message:`Records not found`});
        }
        return res.status(201).json(GetAllFlightRecords);
    }catch(error) {
        console.error(`Failed to get all Flight records`);
        return res.status(500).json({message:`Internal server error`});
    }
}

const SearchFlight = async (req,res) => {
    const {id} = req.params;
    try{
        const Flightinfo = await FlightUserSchema.findById(id);
        if(!Flightinfo){
            return res.status(409).json({message:`Flight information not found`});
        }
        return res.status(200).json({message:`Flight information includes:`,Flightinfo});
    }catch(error){
        console.error(`Flight not found`)
        return res.status(500).json({message:`Internal server error`});
    }
}

const UpdateFlightinfo = async (req,res) => {
    const{id} = req.params;
    const {Full_name,
        EmailAddress,
        Location,
        Ticket_type,
        Ticket_price,
        Nationality,
        Present_Country,
        Destination_Country} = req.body;
    try{
        if(!Full_name||
        !EmailAddress||
        !Location||
        !Ticket_type||
        !Ticket_price||
        !Nationality||
        !Present_Country||
        !Destination_Country) {
            return res.status(409).json({message:`All fields are required`});
        }
        const UpdatedFlightInfo = await  FlightUserSchema.findByIdAndUpdate(id,{
            Full_name,
            EmailAddress,
            Location,
            Ticket_type,
            Ticket_price,
            Nationality,
            Present_Country,
            Destination_Country
        },{new:true});
        if(!UpdatedFlightInfo){
            return res.status(409).json({message:`Failed to update flight information`});
        }
        return res.status(200).json(UpdatedFlightInfo);
 }catch(error) {
        console.log(error);
        return res.status(500).json({message:`Internal server error`});
    }
}

const DeleteFlight = async (req,res) => {
    const {id} = req.params
    try {
        const DeleteFlightinfo = await FlightUserSchema.findByIdAndDelete(id)
        if(!DeleteFlightinfo){
            return res.status(409).json({message:`Flight information not found`});
        }
        return res.status(200).json({message:`Filght information deleted successfully`});
    }catch(error){
        console.error(`Failed to delete flight information`,error)
        return res.status(500).json({message:`Internal server error`});
    }
}



module.exports = {RegisterFlight,AllFlightRecords,SearchFlight,UpdateFlightinfo,DeleteFlight};