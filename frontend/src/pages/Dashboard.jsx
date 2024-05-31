import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MonthDropdown from "../components/MonthDropdown";
import { TableUINew } from "../components/TransactionTable";
import Statistics from "../components/Statistics";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { useState } from "react";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");

  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
  };
  return (
    <Router>
      <div className="flex flex-col w-[80%] mx-auto mt-4">
        
        <nav className="flex justify-around border-b border-gray-200">
          <Link to="/dashboard" className="p-2 text-blue-500">
            Dashboard
          </Link>
          <Link to="/transaction-dashboard" className="p-2 text-blue-500">
            Table
          </Link>
          <Link to="/bar-chart" className="p-2 text-blue-500">
            Bar Chart
          </Link>
          <Link to="/pie-chart" className="p-2 text-blue-500">
            Pie Chart
          </Link>
        </nav>
        <div className="mt-4">
          <Routes>
            <Route
              path="/dashboard"
              element={<Statistics selectedMonth={selectedMonth} />}
            />
            <Route
              path="/transaction-dashboard"
              element={
                <TableUINew
                  selectedMonth={selectedMonth}
                  onMonthChange={handleMonthChange}
                />
              }
            />

            <Route
              path="/bar-chart"
              element={<BarChart selectedMonth={selectedMonth} />}
            />
            <Route
              path="/pie-chart"
              element={<PieChart selectedMonth={selectedMonth} />}
            />
            <Route
              path="/"
              element={<Statistics selectedMonth={selectedMonth} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
