const TableBody = ({ data, columns, styles }) => {
    return (
      <tbody style={{ background: styles.bodyBg, color: styles.bodyColor }}>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map(({ key }) => (
              <td key={key}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };
  
  export default TableBody;
  