const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: `${path.resolve()}/config.env` });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
let server;
const port = process.env.PORT || 8000;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to database successfull");
  })
  .then(
    (server = app.listen(port, () => {
      console.log(`application is running in port ${port}`);
    }))
  );

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("unhandleError shutting down... 💥");
  server.close(() => {
    process.exit(1);
  });
});
