import express from "express";
import * as db from "./src/index";
import { sequelize } from "./src/models/index";
import mainRouter from "./src/routers/main-router";
import bodyParser from "body-parser";
import { errorHandler } from "./common/helper/middleware";
import { errors } from "celebrate";
import { scheduleJob } from "node-schedule";

const app = express();
app.use(bodyParser.json());
app.use("/", mainRouter);
app.use(errors());
app.use(errorHandler);

sequelize
  .authenticate()
  .then(() => {
    console.info("Connection has been established successfully.");
    db.sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Database synchronized with the latest formate.");
        scheduleJob("0 * * * * *", () => console.log("test"));
      })
      .catch((err) => {
        console.error("Error synchronizing database:", err);
      });
  })
  .catch((error: Error) => {
    console.error(`Unable to connect to the database: ${JSON.stringify(error)}`);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is started at the port ${port}`);
});
