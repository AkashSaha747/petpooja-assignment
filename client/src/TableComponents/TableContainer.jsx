import React, { useState, useMemo } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import FilterInput from "./FilterInput";



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
  const [styles, setStyles] = useState({
    fontSize: "16px",
    headerBg: "#f0f0f0",
    bodyBg: "#ffffff",
    headerColor: "#000",
    bodyColor: "#333",
  });

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
    <div>
      <div className="table-controls">
        <label>
          Font Size:
          <input
            type="number"
            value={styles.fontSize.replace("px", "")}
            onChange={(e) =>
              setStyles({ ...styles, fontSize: `${e.target.value}px` })
            }
          />
        </label>
      </div>
      <table>
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          styles={styles}
        />
        <TableBody
          data={sortedData}
          columns={columns}
          styles={styles}
        />
      </table>
    </div>
  );
};

export default TableContainer;
