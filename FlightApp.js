const express  = require(`express`);
const FlightApp = express();
const morgan = require(`morgan`);
const ConnectUserDB = require("./src/Config/FlightDB");
const userRouter = require("./src/Routes/flight.user.routes");
const ConnectAuthDB = require("./src/Config/FlightAuthDB");
require("dotenv").config();


const port = process.env.PORT || 6000;

FlightApp.use(express.json());
FlightApp.use(morgan("dev"));

FlightApp.use(`/users/api/`,userRouter);



FlightApp.get(`/`,(req,res) => {
    res.send(`Welcome the world AirlineFlight, where you can book your ticket and we process your on boarding,
        and flight`);
});


FlightApp.listen(port,() => {
    ConnectUserDB();
     ConnectAuthDB();
    console.log(`Flight Application is running on a server http://localhost:${port}`);
})