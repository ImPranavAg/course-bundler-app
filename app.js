import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middlewares/Error.js";

const app = express();

// connecting the env file
config({
  path: "./config/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(ErrorMiddleware);
app.use(cookieParser());

// Importing and using Routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

export default app;
