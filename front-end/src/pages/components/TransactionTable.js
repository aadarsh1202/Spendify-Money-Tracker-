import React, { useState } from "react";
import { useEffect } from "react";
import TransactionList from "./TransactionList";

const TransactionTable = ({ transactions }) => {
  const months = [
    { index: "01", value: "January" },
    { index: "02", value: "Febuary" },
    { index: "03", value: "March" },
    { index: "04", value: "April" },
    { index: "05", value: "May" },
    { index: "06", value: "June" },
    { index: "07", value: "July" },
    { index: "08", value: "August" },
    { index: "09", value: "September" },
    { index: "10", value: "October" },
    { index: "11", value: "November" },
    { index: "12", value: "December" },
  ];

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  console.log(transactions);
  let temp_income = 0;
  let temp_expense = 0;

  useEffect(() => {
    Object.keys(transactions).map((date) => {
      let transactionsOnDate = transactions[date];
      Object.keys(transactionsOnDate).map((index) => {
        if (transactionsOnDate[index].type === "Income") {
          temp_income += parseInt(transactionsOnDate[index].amount);
          // setIncome(prev => prev + parseInt(transactionsOnDate[index].amount));
        } else {
          temp_expense += parseInt(transactionsOnDate[index].amount);

          // setExpense(prev => prev + parseInt(transactionsOnDate[index].amount));
        }
        setIncome(temp_income);
        setExpense(temp_expense);
      });
    });
  }, [transactions]);

  const renderTransactionsList = Object.keys(transactions).map((date) => {
    console.log(transactions[date]);
    console.log(typeof date);
    console.log(date.slice(5, 7));
    console.log(months[parseInt(date.slice(5, 7)) - 1].value);
    let transactionsOnDate = transactions[date];
    return (
      <div className="border">
        <h1>{months[parseInt(date.slice(5, 7)) - 1].value}</h1>
        <TransactionList transactionsOnDate={transactionsOnDate} />
      </div>
    );
  });

  return (
    <div>
      <h1>Income : {income}</h1>
      <h1>Expense:{expense}</h1>

      {renderTransactionsList}
    </div>
  );
};

export default TransactionTable;
