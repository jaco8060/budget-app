import React, { createContext, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useBudget() {
  return useContext(BudgetContext);
}

export const BudgetProvider = ({ children }) => {
  // Main data points stored in localStorage
  const [monthlyEarnings, setMonthlyEarnings] = useLocalStorage(
    "monthlyEarnings",
    0
  );
  const [monthlyExpenses, setMonthlyExpenses] = useLocalStorage(
    "monthlyExpenses",
    []
  ); // { id, item, price, payableTo, period }
  const [extraSpends, setExtraSpends] = useLocalStorage("extraSpends", []); // { id, item, price, date }

  function addMonthlyExpense({ item, price, payableTo, period }) {
    setMonthlyExpenses((prev) => {
      return [
        ...prev,
        {
          id: uuidV4(),
          item,
          price: parseFloat(price),
          payableTo,
          period,
          dateModified: new Date().toISOString(),
        },
      ];
    });
  }

  function addExtraSpend({ item, price }) {
    setExtraSpends((prev) => {
      return [
        ...prev,
        {
          id: uuidV4(),
          item,
          price: parseFloat(price),
          date: new Date().toISOString(),
        },
      ];
    });
  }

  function deleteMonthlyExpense(id) {
    setMonthlyExpenses((prev) => prev.filter((exp) => exp.id !== id));
  }

  function deleteExtraSpend(id) {
    setExtraSpends((prev) => prev.filter((exp) => exp.id !== id));
  }

  const value = {
    monthlyEarnings,
    setMonthlyEarnings,
    monthlyExpenses,
    addMonthlyExpense,
    deleteMonthlyExpense,
    extraSpends,
    addExtraSpend,
    deleteExtraSpend,
  };

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};
