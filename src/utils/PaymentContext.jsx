import React, { useEffect, createContext, useState, useContext } from "react";
import axios from "axios";

const PaymentDataContext = createContext();

export function usePaymentDataContext() {
  return useContext(PaymentDataContext);
}

export function PaymentDataProvider({ children }) {
  const [appState, setAppState] = useState({
    resultsarray: {},
    filteredData: [],
    loadData: false,
    filteredDataVal: "",
    isLoadMoreRequired: false,
    nextPageIndex: "",
    isDataFiltered: false,
  });

  const { filteredDataVal, isLoadMoreRequired, resultsarray, nextPageIndex } =
    appState;

  
  const URL = "http://localhost:9001/api/payments";

  const getPaymentData = async (nextIndex) => {
    const { data } = await axios.get(URL, {
      params: { pagelndex: nextIndex },
    });
    if (data) {
      let updatedResponse = data;
      if (isLoadMoreRequired) {
        updatedResponse.results.push(...resultsarray.results);
        setAppState({
          ...appState,
          resultsarray: updatedResponse,
          filteredData: filteredDataVal? filterResult : [] ,
          isDataFiltered: filteredDataVal ? true : false,
        });
      } else {
        setAppState({
          ...appState,
          resultsarray: updatedResponse,
          nextPageIndex: updatedResponse.metaDatal.nextPageIndex,
          isLoadMoreRequired: updatedResponse.metaDatal.hasMoreElements,
          isDataFiltered: false
        });
      }
    }
  };


  useEffect(() => {
    getPaymentData();
  }, []);


  const filterResult =
    resultsarray.results &&
    resultsarray.results.filter(
      (item) => item.paymentStatus === filteredDataVal
    );


  useEffect(() => {
    if (filteredDataVal) {
      setAppState({
        ...appState,
        filteredData: filterResult,
        isDataFiltered: true,
      });
    }
  }, [filteredDataVal]);

  return (
    <PaymentDataContext.Provider
      value={{
        appState,
        setAppState,
        getPaymentData,
      }}
    >
      {children}
    </PaymentDataContext.Provider>
  );
}
