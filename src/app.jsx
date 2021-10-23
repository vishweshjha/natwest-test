import React from "react";
import { PaymentDataProvider } from "./utils/PaymentContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";

import { DisplayPayment } from "./views/DisplayPayment";

const App = () => {
  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">Natwest</h5>
      </div>
      <div className="container">
        <PaymentDataProvider>
          <DisplayPayment />
        </PaymentDataProvider>
      </div>
    </>
  );
};

export default App;
