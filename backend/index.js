import express from "express";
import dotnev from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import transactionRoutes from "./routes/TransactionRoute.js";

dotnev.config();

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.log(error);
  }
};

connectDB();

app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
