const TableHeader = ({ columns, sortConfig, setSortConfig, styles }) => {
    const handleSort = (key) => {
      setSortConfig((prev) => {
        if (!prev || prev.key !== key) return { key, direction: "asc" };
        if (prev.direction === "asc") return { key, direction: "desc" };
        return null;
      });
    };
  
    return (
      <thead style={{ background: styles.headerBg, color: styles.headerColor }}>
        <tr>
          {columns.map(({ title, key, sortable }) => (
            <th
              key={key}
              onClick={() => sortable && handleSort(key)}
              style={{ cursor: sortable ? "pointer" : "default" }}
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
  