const TableHeader = ({ columns, sortConfig, setSortConfig }) => {
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  return (
    <thead className="table-header">
      <tr className="header-row">
        {columns.map(({ title, key, sortable }) => (
          <th
            key={key}
            className={`header-cell ${sortable ? "sortable" : ""}`}
            onClick={() => sortable && handleSort(key)}
          >
            {title}
            {sortable && (
              <>
                {sortConfig?.key === key &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
