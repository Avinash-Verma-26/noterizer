const express = require("express");
const authRouter = require("./routes/auth.route");
const cookieparser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieparser());
app.use("/api/auth", authRouter);

module.exports = app;
