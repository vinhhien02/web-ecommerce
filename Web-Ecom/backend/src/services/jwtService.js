const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/UserModel");

const generalAccessToken = (id, role) =>
  jwt.sign({ _id: id, role }, process.env.ACCESS_TOKEN, { expiresIn: "2d" });
const generalRefreToken = (id) =>
  jwt.sign({ _id: id }, process.env.REFRESH_TOKEN, { expiresIn: "7d" });


module.exports = {
  generalAccessToken: generalAccessToken,
  generalRefreToken: generalRefreToken,
 
};
