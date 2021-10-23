import React, { useEffect, createContext, useState, useContext } from "react";
import axios from "axios";

const PaymentDataContext = createContext();

export function usePaymentDataContext() {
  return useContext(PaymentDataContext);
}

export function PaymentDataProvider({ children }) {
  const [state, setState] = useState({
    resultsarray: {},
    filteredData: [],
    loadData: false,
    filteredDataVal: "",
    isLoadMoreRequired: false,
    nextPageIndex: "",
    isDataFiltered: false,
  });

  const { filteredDataVal, isLoadMoreRequired, resultsarray } = state;

  const URL = "http://localhost:9001/api/payments";

  const getPaymentData = async (nextIndex) => {
    const { data } = await axios.get(URL, {
      params: { pagelndex: nextIndex },
    });
    if (data) {
      let updatedResponse = data;
      if (isLoadMoreRequired) {
        updatedResponse.results.push(...resultsarray.results);
        setState({...state, isDataFiltered: false});
      }
      setState({ ...state,
        resultsarray: updatedResponse,
        nextPageIndex: updatedResponse.metaDatal.nextPageIndex,
        isLoadMoreRequired: updatedResponse.metaDatal.hasMoreElements,});
    }
  };
  useEffect(() => {
    getPaymentData();
  }, []);

  useEffect(() => {
    if (filteredDataVal) {
      const updatedData = resultsarray.results.filter(
        (item) => item.paymentStatus === filteredDataVal
      );
      setState({...state,filteredData:updatedData})
    }
  }, [filteredDataVal]);

  return (
    <PaymentDataContext.Provider
      value={{
        state,
        setState,
        getPaymentData
      }}
    >
      {children}
    </PaymentDataContext.Provider>
  );
}
