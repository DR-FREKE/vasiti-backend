import "babel-polyfill";
import express from "express";
import { Server } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { cloudinaryConfig } from "./config/cloudinary.config";

//db connection goes here
import "./server/database/connection";
import productRoute from "./server/routes/product.route";

//initialize app here
const app = express();
const http = Server(app);
const PORT = process.env.PORT || 8009;
dotenv.config();

import bootstrap from "./server/bootstrap";
bootstrap();

/** set app middleware here */
app.use(cors());
app.use(express.urlencoded({ extended: true })); //for application/x-www-form-urlencoded
app.use(express.json()); //for application/json

/** set route middleware here */
app.use("*", cloudinaryConfig);
app.use("/api", productRoute);
app.all("/*", (req, res) => res.json({ message: "can't make request" }));

const server = http.listen(PORT, () => {
  console.log(`app started on port ${server.address().port}`);
});
