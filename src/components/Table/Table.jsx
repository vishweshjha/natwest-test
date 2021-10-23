import React from "react";
import { default as BootstrapTable } from "react-bootstrap/Table";

const Table = (props) => {
  const { header, row, paymentTerms } = props;

//Rendering Header for table
  const RenderHeader = () => {
    return (
      <thead>
        <tr>
          {Object.values(header).map((item, i) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
      </thead>
    );
  };

  //Rendering Body for Table
  const RenderBody = () => {
    return row.map((item, i) => {
      const {
        fromAccount,
        toAccaunt,
        paymentAmount,
        paymentCurrency,
        paymentDate,
      } = item;
      return (
        <tbody key={i}>
          <tr>
            <td>
              <table>
                <tr>
                  <td className="font-weight-bold">Account Name</td>
                  <td>{fromAccount.accountName}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Sort Code</td>
                  <td>{fromAccount.sortCode}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Account Number</td>
                  <td>{fromAccount.accountNumber}</td>
                </tr>
              </table>
            </td>
            <td>{paymentAmount}</td>
            <td>{paymentCurrency}</td>
            <td>{paymentDate}</td>
            <td>{paymentTerms[item.paymentStatus]}</td>
            <td>{item.paymentType}</td>
            <td>
              <table>
                <tr>
                  <td className="font-weight-bold">Account Name</td>
                  <td>{toAccaunt.accountName}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Sort Code</td>
                  <td>{toAccaunt.sortCode}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Account Number</td>
                  <td>{toAccaunt.accountNumber}</td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      );
    });
  };
  return (
    <BootstrapTable bordered hover size="sm">
      <RenderHeader />
      <RenderBody />
    </BootstrapTable>
  );
};

export default Table;
