import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import { connection } from "./database.js";
import User from "./modals/user.modal.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/user", userRoutes);

const startServer = async () => {
  await connection();
  await User.sync({ force: true });
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
