import express from "express";
import authRoute from "./routes/auth.route.ts";
import userRoute from "./routes/user.route.ts";
import blogRoute from "./routes/blog.route.ts";

const app = express();
app.use(express.json());
app.use("/", authRoute);
app.use("/", userRoute);
app.use("/", blogRoute);

export default app;
