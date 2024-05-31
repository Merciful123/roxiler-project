import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  dateOfSale: { type: String, required: true },
  sold: { type: Boolean, required: true },
});

export default mongoose.model("Transaction", transactionSchema);
