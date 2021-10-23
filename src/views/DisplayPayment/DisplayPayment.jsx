import React, { useEffect, useState } from "react";
import { usePaymentDataContext } from "../../utils/PaymentContext";

import "bootstrap/dist/css/bootstrap.min.css";

import { headers, paymentTerms } from "./constant";
import { Table } from "../../components/Table";
import { Button, Dropdown } from "react-bootstrap";

const DisplayPayment = () => {
  const { state, setState, getPaymentData } = usePaymentDataContext();

  useEffect(() => {
    setState({ ...state, loadData: true });
  }, []);

  const handleSelect = (e) => {
    setState({ ...state, filteredDataVal: e, isDataFiltered: true });
  };

  const reset = () => {
    setState({ ...state, isDataFiltered: false });
  };

  const {
    resultsarray,
    isLoadMoreRequired,
    filteredData,
    isDataFiltered,
    nextPageIndex,
  } = state;

  return (
    <div className="mb-4">
      {resultsarray && resultsarray.results && (
        <>
          <div className="row">
            <div className="col-xs-2 p-4">
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select Payment Status
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {Object.keys(paymentTerms).map((item, i) => (
                    <Dropdown.Item key={item} eventKey={item}>
                      {paymentTerms[item]}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>{" "}
            </div>
            <div className="col-xs-2 p-4">
              <Button variant="primary" size="xl" onClick={reset}>
                Reset
              </Button>
            </div>
          </div>
          <Table
            header={headers}
            row={isDataFiltered ? filteredData : resultsarray.results}
            paymentTerms={paymentTerms}
          />
          {isLoadMoreRequired && (
            <Button
              variant="primary"
              size="lg"
              disabled={!isLoadMoreRequired}
              onClick={() => getPaymentData(nextPageIndex)}
            >
              Load More{" "}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default DisplayPayment;
