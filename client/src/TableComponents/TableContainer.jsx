import React, { useState, useMemo } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./TableContainer.css"; // Import the CSS file

const TableContainer = () => {
  const data = [
    { id: 1, name: "Alice", age: 25, salary: 5000 },
    { id: 2, name: "Bob", age: 30, salary: 6000 },
    { id: 3, name: "Charlie", age: 35, salary: 7000 },
  ];

  const columns = [
    { title: "ID", key: "id", sortable: true, filterable: true },
    { title: "Name", key: "name", sortable: true, filterable: true },
    { title: "Age", key: "age", sortable: true, filterable: true },
    { title: "Salary", key: "salary", sortable: true, filterable: true },
  ];

  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState(null);

  // Handle filter input changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return Object.entries(filters).every(([key, value]) =>
        String(row[key]).toLowerCase().includes(value.toLowerCase())
      );
    });
  }, [data, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const { key, direction } = sortConfig;
    return [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  return (
    <div className="table-container">
      <div className="filter-inputs">
        {columns.map(
          (column) =>
            column.filterable && (
              <FilterInput
                key={column.key}
                columnKey={column.key}
                onFilterChange={handleFilterChange}
              />
            )
        )}
      </div>

      <table className="table">
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        />
        <TableBody data={sortedData} columns={columns} />
      </table>
    </div>
  );
};

const FilterInput = ({ columnKey, onFilterChange }) => {
  return (
    <input
      className="filter-input"
      type="text"
      placeholder={`Filter by ${columnKey}`}
      onChange={(e) => onFilterChange(columnKey, e.target.value)}
    />
  );
};

export default TableContainer;
