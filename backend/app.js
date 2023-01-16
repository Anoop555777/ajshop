const express = require("express");
const app = express();
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");
const reviewRouter = require("./routes/reviewRouter");
const globalErrorHandler = require("./controller/errorController");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: `${path.resolve()}/config.env` });

//body parser middleware
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.static(`${__dirname}/frontend`));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(path.resolve(), "frontend", "build", "index.html")
    )
  );
}

app.use(globalErrorHandler);

module.exports = app;
