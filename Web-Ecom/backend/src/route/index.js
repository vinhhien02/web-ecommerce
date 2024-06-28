const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const favoriteRouter = require("./favoriteRouter");
const reportRouter = require("./reportRouter");

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/favorite", favoriteRouter);
  app.use("/api/report", reportRouter);
};

module.exports = routes;
