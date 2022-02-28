const app = require("./app");
const connectDB = require("./config/database.js");
const dotenv = require("dotenv");

//setting up config file
dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDB();
app.listen(process.env.PORT, () => {
  console.log(
    `Server start on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
