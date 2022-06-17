const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const roleRoutes = require("./routes/roleRoutes.js");
const permissionRoutes = require("./routes/permissionRoutes.js");
const citizenRoutes = require("./routes/citizenRoutes.js");
const candidateRoutes = require("./routes/candidateRoutes.js");
const voteRoutes = require("./routes/voteRoutes.js");
const voterlistRoutes = require("./routes/voterListRoutes.js");
const countingRoutes = require("./routes/countingRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const globalHandler = require("./controller/errorController.js");

const Port = process.env.Port || 8080;
const mongoURl = process.env.mongo_URL;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(
  mongoURl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

app.use("/", userRoutes);
app.use("/", roleRoutes);
app.use("/", voteRoutes);
app.use("/", citizenRoutes);
app.use("/", countingRoutes);
app.use("/", candidateRoutes);
app.use("/", voterlistRoutes);
app.use("/", permissionRoutes);

app.use(globalHandler);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
