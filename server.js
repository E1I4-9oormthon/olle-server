const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRouter = require("./routes/auth");

app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.FRONT_URL,
      "http://127.0.0.1:5173/",
      "http://localhost:3000",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use("/", authRouter);

app.listen(8080, function () {
  console.log("listening on 8080");
});
