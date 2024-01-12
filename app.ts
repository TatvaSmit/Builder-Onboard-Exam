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
      .sync({ force: true })
      .then(() => {
        console.log("Database synchronized with the latest formate.");
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
