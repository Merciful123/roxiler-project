import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const BarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:4040/api/transactions/barchart`,
          `https://roxiler-project-gv4j.onrender.com/transactions/barchart`,
          { params: { month: selectedMonth } }
        );
        setChartData(response.data);
        setError(false);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
        setError(true);
      }
    };

    if (selectedMonth) {
      fetchBarChartData();
    }
  }, [selectedMonth]);

  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "Number of Items",
        data: Object.values(chartData),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col w-[60%] min-xl:w-[50%] max-sm:w-[80%] mx-auto mt-20 max-sm:mt-20 min-xl:h-[50vh] h-[60vh] justify-center items-center max-sm:mx-5">
      {error ? (
        <p className="text-red-500 text-center font-semibold">
          Error fetching data from the server.
        </p>
      ) : (
        <>
          <p className="lg:place-self-start text-2xl font-semibold mb-2">
            Bar Charts Stats - {selectedMonth}
          </p>
          <Bar data={data} />
        </>
      )}
    </div>
  );
};

export default BarChart;
