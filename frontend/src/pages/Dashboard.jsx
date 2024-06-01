import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "p-2 text-blue-700 font-bold border-b-2 border-blue-700"
                : "p-2 text-blue-500"
            }
          >
            Statistics
          </NavLink>
          <NavLink
            to="/transaction-dashboard"
            className={({ isActive }) =>
              isActive
                ? "p-2 text-blue-700 font-bold border-b-2 border-blue-700"
                : "p-2 text-blue-500"
            }
          >
            Transaction Dashboard
          </NavLink>
          <NavLink
            to="/bar-chart"
            className={({ isActive }) =>
              isActive
                ? "p-2 text-blue-700 font-bold border-b-2 border-blue-700"
                : "p-2 text-blue-500"
            }
          >
            Bar Chart
          </NavLink>
          <NavLink
            to="/pie-chart"
            className={({ isActive }) =>
              isActive
                ? "p-2 text-blue-700 font-bold border-b-2 border-blue-700"
                : "p-2 text-blue-500"
            }
          >
            Pie Chart
          </NavLink>
        </nav>
        <div className="mt-4">
          <Routes>
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
