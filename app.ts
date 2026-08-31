import express from "express";
import authRoute from "./routes/auth.route.ts";
import userRoute from "./routes/user.route.ts";

const app = express();
app.use(express.json());
app.use("/", authRoute);
app.use("/", userRoute);

export default app;
