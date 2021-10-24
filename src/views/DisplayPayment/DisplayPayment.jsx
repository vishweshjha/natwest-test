import React, { useEffect } from "react";
import { usePaymentDataContext } from "../../utils/PaymentContext";

import "bootstrap/dist/css/bootstrap.min.css";

import { headers, paymentTerms } from "./constant";
import { Table } from "../../components/Table";
import { Button, Dropdown, Badge } from "react-bootstrap";

const DisplayPayment = () => {
  const { appState, setAppState, getPaymentData } = usePaymentDataContext();

  useEffect(() => {
    setAppState({ ...appState, loadData: true });
  }, []);

  const handleSelect = (e) => {
    setAppState({ ...appState, filteredDataVal: e, isDataFiltered: true });
  };

  const reset = () => {
    setAppState({ ...appState, isDataFiltered: false });
  };

  const {
    resultsarray,
    isLoadMoreRequired,
    filteredData,
    isDataFiltered,
    nextPageIndex,
  } = appState;

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
            <div className="row">
              <div className="col-8">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!isLoadMoreRequired}
                  onClick={() => getPaymentData(nextPageIndex)}
                >
                  Load More{" "}
                </Button>
              </div>
              <div className="col-4 text-right">
                <h5>
                  Row Count{" "}
                  <Badge bg="secondary">
                    {isDataFiltered
                      ? filteredData.length
                      : resultsarray.results.length}
                  </Badge>
                </h5>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DisplayPayment;
