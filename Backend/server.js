const app = require("./src/app");
const dotenv = require("dotenv");
const connectToDb = require("./src/config/database");
dotenv.config();
const PORT = process.env.PORT || 3000;

connectToDb();

app.listen(PORT, () => {
  console.log("Server listening on port: ", PORT);
});
