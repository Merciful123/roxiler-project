
const MonthDropdown = ({ selectedMonth, onMonthChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <select
      className="bg-yellow-100 rounded-md px-5 mb-4 py-1"
      value={selectedMonth}
      onChange={(e) => onMonthChange(e.target.value)}
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthDropdown;
