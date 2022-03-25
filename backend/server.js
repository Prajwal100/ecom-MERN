const app = require("./app");
const connectDB = require("./config/database.js");
const dotenv = require("dotenv");

//Handled the uncaught exceptions from
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down the server due to uncaught exception");
  process.exit(1);
});
//setting up config file
dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDB();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server start on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handled the unhandled Promise rejections

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejections");
  server.close(() => {
    process.exit(1);
  });
});
