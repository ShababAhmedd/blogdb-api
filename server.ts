import sequelize from "./config/db.ts";
import app from "./app.ts";
import User from "./models/user.model.ts";
import Blog from "./models/blog.model.ts";
import dotenv from "dotenv";
dotenv.config();

await sequelize.authenticate();
await sequelize.sync();
console.log("db is connected and table is synced");

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
