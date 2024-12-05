const TableBody = ({ data, columns }) => {
  return (
    <tbody className="table-body">
      {data.map((row, index) => (
        <tr key={index} className="table-row">
          {columns.map(({ key }) => (
            <td key={key} className="table-cell">
              {row[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
