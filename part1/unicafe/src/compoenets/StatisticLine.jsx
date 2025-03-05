const StatisticLine = ({ text, value }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              {" "}
              {text} {value}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default StatisticLine;
