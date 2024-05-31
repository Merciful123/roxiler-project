import express from "express";

import {
  initializeDatabase,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
} from "../controllers/TransactionController.js";

const router = express.Router();

router.get("/initialize", initializeDatabase);
router.get("/list", listTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart", getBarChart);
router.get("/piechart", getPieChart);
router.get("/combined", getCombinedData);

export default router;
