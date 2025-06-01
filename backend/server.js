const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: `${path.resolve()}/config.env` });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

console.log(DB);

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("Connect to database successfull");
  } catch (err) {
    console.log(`connection failed ${err}`);
    process.exit(1);
  }
};

const port = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`application is running in port ${port}`);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("unhandleError shutting down... 💥");
  server.close(() => {
    process.exit(1);
  });
});
