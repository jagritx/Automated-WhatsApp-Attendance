import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./services/database.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/", userRoutes);

connectToDatabase()
  .then(() => {
    const port = process.env.PORT || 6000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
