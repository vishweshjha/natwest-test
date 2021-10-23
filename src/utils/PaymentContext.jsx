import React, { useEffect, createContext, useState, useContext } from "react";
import axios from "axios";

const PaymentDataContext = createContext();

export function usePaymentDataContext() {
  return useContext(PaymentDataContext);
}

export function PaymentDataProvider({ children }) {

  const [resultsarray, setResultsArray] = useState({});
  const [filteredData, setFilteredData] = useState([])
  const [loadData, setLoadData] = useState(false)
  const [filteredDataVal, setFilteredDataVal] = useState('')
  const [isLoadMoreRequired, setIsLoadMoreRequired] = useState(false);
  const [nextPageIndex, setNextPageIndex] = useState('')


  const getPaymentData = async (nextIndex) => {
    const { data } = await axios.get("http://localhost:9001/api/payments", {
      params: { pagelndex: nextIndex },
    });
    if (data) {
      let updatedResponse = data;
      if (isLoadMoreRequired) {
        updatedResponse.results.push(...resultsarray.results);
      }
      setResultsArray(updatedResponse);
      setNextPageIndex(updatedResponse.metaDatal.nextPageIndex);
      setIsLoadMoreRequired(updatedResponse.metaDatal.hasMoreElements);
    }
  };
  useEffect(() => {
    getPaymentData();
  }, [loadData]);

  useEffect(() => {
    if(filteredDataVal){
        const updatedData = resultsarray.results.filter(
            (item) => item.paymentStatus === filteredDataVal
          );
         setFilteredData(updatedData)
    }
  }, [filteredDataVal]);


  return (
    <PaymentDataContext.Provider value={{setLoadData,resultsarray, setFilteredDataVal, filteredData, isLoadMoreRequired, setIsLoadMoreRequired, getPaymentData, nextPageIndex}}>
      {children}
    </PaymentDataContext.Provider>
  );
}
