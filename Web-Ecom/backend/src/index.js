const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const route = require("./route");
const cookieParser = require("cookie-parser");
const http = require("http"); //
const socketIo = require("socket.io"); //
dotenv.config();
const app = express();
const server = http.createServer(app); //
const io = socketIo(server, {
  cors: {
    //
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB}`);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection to MongoDB failed:", error.message);
  }
};
connectDB();
io.on("connection", (socket) => {
  //
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
app.locals.io = io; //

const port = process.env.PORT || 6969;

route(app);
server.listen(port, () => {
  console.log("Backend Nodejs is running on port: " + port); //
});
