import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
} from "@nextui-org/react";
import "./index.css";
import MonthDropdown from "../MonthDropdown";
// import { SearchIcon } from "./SearchIcon"; // Make sure to have an icon for search

const getKeyValue = (item, key) => {
  const value = item[key];
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return value;
};

export function TableUINew({ selectedMonth, onMonthChange }) {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);

  const perPage = 3;

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, search, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `https://roxiler-project-gv4j.onrender.com/api/transactions/list`,
        {
          params: { month: selectedMonth, search, page, perPage },
        }
      );
      setTransactions(response.data.transactions);
      setTotal(response.data.total);
      setError(false); // Reset error state if successful
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(true); // Set error state to true if an error occurs
    }
  };

  const onSearchChange = useCallback((value) => {
    if (value) {
      setSearch(value);
      // setPage(1);
    } else {
      setSearch("");
    }
  }, []);

  const onClear = useCallback(() => {
    setSearch("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between w-[80%] mx-auto mb-4">
        <Input
          isClearable
          className="sm:max-w-[44%] lg:w-[25%] bg-yellow-100 rounded-[32px] px-5 py-1"
          placeholder="Search..."
          // startContent={<SearchIcon />}
          value={search}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
        <MonthDropdown
          selectedMonth={selectedMonth}
          onMonthChange={onMonthChange}
        />
      </div>
    );
  }, [search, onClear, onSearchChange, selectedMonth, onMonthChange]);

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className=" rounded-[50%] bg-white flex justify-center text-center text-2xl font-semibold items-center h-[10rem] w-[10rem]">
          Transaction Dashboard
        </div>
        {topContent}
      </div>

      {error ? (
        <p className="text-red-500 font-semibold text-center mt-4">
          Error fetching transactions data.
        </p>
      ) : (
        <Table
          className="bg-yellow-100 rounded-3xl w-[80%] mx-auto h-[60vh] overflow-auto"
          aria-label="Example table with client side pagination "
        >
          <TableHeader>
            <TableColumn key="title" style={{ width: "20%" }}>
              Title
            </TableColumn>
            <TableColumn key="price" style={{ width: "10%" }}>
              Price
            </TableColumn>
            <TableColumn key="description" style={{ width: "30%" }}>
              Description
            </TableColumn>
            <TableColumn key="category" style={{ width: "10%" }}>
              Category
            </TableColumn>
            <TableColumn key="dateOfSale" style={{ width: "20%" }}>
              Date Of Sale
            </TableColumn>
            <TableColumn key="sold" style={{ width: "10%" }}>
              Sold
            </TableColumn>
          </TableHeader>
          <TableBody items={transactions}>
            {(item) => (
              <TableRow key={item.id} className="table-row">
                {(columnKey) => (
                  <TableCell className="table-cell">
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <div className="flex w-full justify-center ">
        <Pagination
          isCompact
          className="overflow-x-hidden mt-4"
          showControls
          showShadow
          color="secondary"
          page={page}
          total={Math.ceil(total / perPage)}
          onChange={(page) => setPage(page)}
        />
      </div>
    </>
  );
}
