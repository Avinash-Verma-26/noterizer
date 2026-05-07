const express = require("express");
const authRouter = require("./routes/auth.route");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const aiRouter = require("./routes/ai.route");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieparser());
app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);

module.exports = app;
