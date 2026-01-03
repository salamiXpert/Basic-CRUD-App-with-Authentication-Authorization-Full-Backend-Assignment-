
const express = require(`express`);
const {RegisterFlight,AllFlightRecords,SearchFlight,UpdateFlightinfo,DeleteFlight} = require("../Controller/flight.user.contollere");
const {SignUp,Login,OTPverification,ResendOTP,ForgotPassword,ResetPassword,GetAlluser} = require("../Controller/flight.Auth.controller");
const userRouter = express.Router();
const isAuth = require(`../Config/isAuth`);



userRouter.post(`/RegisterFlight`,RegisterFlight);
userRouter.get(`/AllFlightRecords`,AllFlightRecords);
userRouter.get(`/SearchFlight/:id`,SearchFlight);
userRouter.patch(`/UpdateFlightinfo/:id`,UpdateFlightinfo);
userRouter.delete(`/DeleteFlight/:id`,DeleteFlight);
userRouter.post(`/SignUp`,SignUp);
userRouter.post(`/Login`,Login);
userRouter.put(`/OTPverification`,OTPverification);
userRouter.put(`/ResendOTP`,ResendOTP);
userRouter.put(`/ForgotPassword`,ForgotPassword);
userRouter.put(`/ResetPassword`,ResetPassword);
userRouter.get(`/GetAlluser`,isAuth,GetAlluser);




module.exports = userRouter;