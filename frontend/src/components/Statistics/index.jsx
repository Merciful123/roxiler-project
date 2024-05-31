// src/components/Statistics.js
import { useState, useEffect } from "react";
import axios from "axios";

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4040/api/transactions/statistics`,
        {
          params: { month: selectedMonth },
        }
      );
      setStatistics(response.data);
      setError(false);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setError(true);
    }
  };

  return (
    <div className="bg-yellow-100 rounded-3xl flex flex-col justify-center items-center h-[40vh] mx-auto w-[50%] max-sm:w-[80%]">
      {error ? (
        <p className="text-red-500 font-semibold">
          Error fetching statistics data.
        </p>
      ) : (
        <>
          <p className="text-2xl font-semibold mb-5 place-self-start pl-[20%]">
            Statistics - {selectedMonth}
          </p>
          <div className="text-xl mt-2 flex justify-between w-[60%]">
            Total Sale Amount: <span> ${statistics.totalSaleAmount}</span>
          </div>
          <div className="text-xl mt-2 flex justify-between w-[60%]">
            Total Sold Items:<span> {statistics.totalSoldItems} </span>
          </div>
          <div className="text-xl mt-2 flex justify-between w-[60%]">
            Total Not Sold Items: <span> {statistics.totalNotSoldItems} </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
