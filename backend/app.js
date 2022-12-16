const express = require("express");
const app = express();
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const globalErrorHandler = require("./controller/errorController");
const cookieParser = require("cookie-parser");

//body parser middleware
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use(globalErrorHandler);

module.exports = app;
