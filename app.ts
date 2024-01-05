import express from "express";
import * as db from "./src/index";
import { sequelize } from "./src/models/index";
import mainRouter from "./src/routers/main-router";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.use("/", mainRouter);

sequelize
  .authenticate()
  .then(() => {
    console.info("Connection has been established successfully.");
    db.sequelize
      .sync()
      .then(() => {
        console.log("Database synchronized.");
      })
      .catch((err) => {
        console.error("Error synchronizing database:", err);
      });
  })
  .catch((error: Error) => {
    console.error(`Unable to connect to the database: ${JSON.stringify(error)}`);
  });

app.listen(5000, () => {
  console.log("test");
});
