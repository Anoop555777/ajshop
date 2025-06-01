const Product = require("./../model/productModel");
const Review = require("./../model/reviewModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const product = require("./products");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connect) => console.log("DataBase connected successfully"));

const importData = async () => {
  try {
    await Product.create(product);
    console.log("Data is placed in DB successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await Review.deleteMany();
    console.log("Data is deleted from DB successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") importData();
else if (process.argv[2] === "--delete") deleteData();

//console.log(process.argv);
