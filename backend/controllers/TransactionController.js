import axios from "axios";
import Transaction from "../models/Transactions.js";

const THIRD_PARTY_API_URL =
  "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

// Function to initialize the database with seed data
export const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(THIRD_PARTY_API_URL);
    const transactions = response.data;

    await Transaction.insertMany(transactions); 

    res.status(200).send({ message: "Database initialized successfully" });
  } catch (error) {
    console.error("Error in initializeDatabase:", error);
    res.status(500).send({ error: "Failed to initialize database" });
  }
};

// Function to list transactions based on month and search query
export const listTransactions = async (req, res) => {
  const { month, search = "", page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;
  const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1;

  console.log(
    `Month: ${month}, Search: ${search}, Page: ${page}, PerPage: ${perPage}, MonthNumber: ${monthNumber}`
  );

  let searchQuery = {};

  if (search) {
    const searchRegex = new RegExp(search, "i");
    searchQuery = {
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { price: isNaN(search) ? null : parseFloat(search) }, // Convert search to number if possible
      ].filter(Boolean), // Remove null values
    };
  }

  try {
    const transactions = await Transaction.find({
      $expr: {
        $eq: [
          { $month: { $toDate: { $substr: ["$dateOfSale", 0, 10] } } },
          monthNumber,
        ], // Extract date part and convert it to date
      },
      ...searchQuery,
    })
      .skip(skip)
      .limit(parseInt(perPage));

    const total = await Transaction.countDocuments({
      $expr: {
        $eq: [
          { $month: { $toDate: { $substr: ["$dateOfSale", 0, 10] } } },
          monthNumber,
        ], // Extract date part and convert it to date
      },
      ...searchQuery,
    });

    res.status(200).send({ transactions, total });
  } catch (error) {
    console.error("Error in listTransactions:", error);
    res.status(500).send({ error: "Failed to list transactions" });
  }
};

// Helper function to convert month name to month number
const getMonthNumber = (month) => {
  const monthMap = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };

  return monthMap[month?.toLowerCase()];
};

// Main logic function for getting statistics
const getStatisticsData = async (month) => {
  const monthNumber = getMonthNumber(month);
  if (!monthNumber) {
    throw new Error("Invalid month parameter.");
  }

  console.log(`Month: ${month}, MonthNumber: ${monthNumber}`);

  const transactions = await Transaction.find({
    $expr: {
      $eq: [
        { $month: { $toDate: { $substr: ["$dateOfSale", 0, 10] } } },
        monthNumber,
      ],
    },
  });

  const totalSaleAmount = transactions.reduce(
    (acc, transaction) => acc + transaction.price,
    0
  );
  const totalSoldItems = transactions.filter(
    (transaction) => transaction.sold
  ).length;
  const totalNotSoldItems = transactions.filter(
    (transaction) => !transaction.sold
  ).length;

  return { totalSaleAmount, totalSoldItems, totalNotSoldItems };
};

// Endpoint function for getting statistics
export const getStatistics = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).send({ error: "Month parameter is required." });
  }

  try {
    const data = await getStatisticsData(month);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error in getStatistics:", error);
    res.status(500).send({ error: "Failed to fetch statistics" });
  }
};

// Main logic function for getting bar chart data
const getBarChartData = async (month) => {
  const monthNumber = getMonthNumber(month);
  if (!monthNumber) {
    throw new Error("Invalid month parameter.");
  }

  console.log(`Month: ${month}, MonthNumber: ${monthNumber}`);

  const transactions = await Transaction.find({
    $expr: {
      $eq: [
        { $month: { $toDate: { $substr: ["$dateOfSale", 0, 10] } } },
        monthNumber,
      ],
    },
  });

  const priceRanges = {
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "901-above": 0,
  };

  transactions.forEach((transaction) => {
    if (transaction.price <= 100) priceRanges["0-100"]++;
    else if (transaction.price <= 200) priceRanges["101-200"]++;
    else if (transaction.price <= 300) priceRanges["201-300"]++;
    else if (transaction.price <= 400) priceRanges["301-400"]++;
    else if (transaction.price <= 500) priceRanges["401-500"]++;
    else if (transaction.price <= 600) priceRanges["501-600"]++;
    else if (transaction.price <= 700) priceRanges["601-700"]++;
    else if (transaction.price <= 800) priceRanges["701-800"]++;
    else if (transaction.price <= 900) priceRanges["801-900"]++;
    else priceRanges["901-above"]++;
  });

  return priceRanges;
};

// Endpoint function for getting bar chart data
export const getBarChart = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).send({ error: "Month parameter is required." });
  }

  try {
    const data = await getBarChartData(month);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error in getBarChart:", error);
    res.status(500).send({ error: "Failed to fetch bar chart data" });
  }
};

// Main logic function for getting pie chart data
const getPieChartData = async (month) => {
  const monthNumber = getMonthNumber(month);
  if (!monthNumber) {
    throw new Error("Invalid month parameter.");
  }

  console.log(`Month: ${month}, MonthNumber: ${monthNumber}`);

  const transactions = await Transaction.find({
    $expr: {
      $eq: [
        { $month: { $toDate: { $substr: ["$dateOfSale", 0, 10] } } },
        monthNumber,
      ],
    },
  });

  const categories = {};

  transactions.forEach((transaction) => {
    categories[transaction.category] =
      (categories[transaction.category] || 0) + 1;
  });

  return categories;
};

// Endpoint function for getting pie chart data
export const getPieChart = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).send({ error: "Month parameter is required." });
  }

  try {
    const data = await getPieChartData(month);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error in getPieChart:", error);
    res.status(500).send({ error: "Failed to fetch pie chart data" });
  }
};

// Function to get combined data (statistics, bar chart, and pie chart) for the given month
export const getCombinedData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).send({ error: "Month parameter is required." });
  }

  console.log(`Month: ${month}`);

  try {
    const [statistics, barChart, pieChart] = await Promise.all([
      getStatisticsData(month),
      getBarChartData(month),
      getPieChartData(month),
    ]);

    res.status(200).send({ statistics, barChart, pieChart });
  } catch (error) {
    console.error("Error in getCombinedData:", error);
    res.status(500).send({ error: "Failed to fetch combined data" });
  }
};
