const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./models/index.js").sequelize;
sequelize.sync();

const authRouter = require("./routes/auth");
const memberRouter = require("./routes/member");

const app = express();

app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONT_URL, "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use("/v1/api/auth", authRouter);
app.use("/v1/api/member", memberRouter);

app.listen(8080, function () {
  console.log("listening on 8080");
});
