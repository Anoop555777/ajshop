const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: `${__dirname}/../config.env` });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { useNewUrlParser: true }).then(() => {
  console.log("Connect to database successfull");
});

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log("application is running in port 8000");
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("unhandleError shutting down... 💥");
  server.close(() => {
    process.exit(1);
  });
});
