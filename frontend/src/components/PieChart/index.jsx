import { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const PieChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get(
          `https://roxiler-project-gv4j.onrender.com/api/transactions/piechart`,
          { params: { month: selectedMonth } }
        );
        setChartData(response.data);
        setError(null); // Reset error state on successful response
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    if (selectedMonth) {
      fetchPieChartData();
    }
  }, [selectedMonth]);

  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        data: Object.values(chartData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF5733",
          "#33FF57",
          "#3357FF",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col w-[30%]  mx-auto mt-20   justify-center items-center">
      <p className="text-2xl font-semibold lg:place-self-start max-sm:text-center max-sm:mb-20">
        Pie Chart Stats - {selectedMonth}
      </p>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="max-sm:h-[50vh]">
          <Pie data={data} />
        </div>
      )}
    </div>
  );
};

export default PieChart;
