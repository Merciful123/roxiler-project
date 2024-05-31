import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url"; // Import fileURLToPath function
import path from "path";

import transactionRoutes from "./routes/TransactionRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // Get the filename
const __dirname = path.dirname(__filename); // Get the directory name

const app = express();
const PORT = process.env.PORT || 5000; // Default to port 5000 if PORT is not defined
const DB_URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

app.use("/api/transactions", transactionRoutes);

// Serve static assets from the frontend build folder
app.use(express.static(path.join(__dirname, "dist")));

// Serve the index.html file for any route that is not matched by the backend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
