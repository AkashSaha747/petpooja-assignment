const FilterInput = ({ columnKey, onFilterChange }) => {
    return (
      <input
        type="text"
        placeholder={`Filter ${columnKey}`}
        onChange={(e) => onFilterChange(columnKey, e.target.value)}
      />
    );
  };
  
  export default FilterInput;
  