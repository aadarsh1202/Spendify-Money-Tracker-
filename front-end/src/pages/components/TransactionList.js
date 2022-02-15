import React from "react";

const TransactionList = ({ transactionsOnDate }) => {
  console.log(transactionsOnDate);
  // const renderCustomersList = Object.keys(transactionsOnDate).map((index) => {
  //   console.log(transactionsOnDate[index])
  //   return
  // <>
  //   <CustomersDetailList
  //     key={customer}
  //     srno={parseInt(customer) + 1}
  //     customer={customersData[customer]}
  //   />
  // </>
  // );
  // });

  const renderDatesList = Object.keys(transactionsOnDate).map((index) => {
    console.log(transactionsOnDate[index]);
    // let transactionsOnDate = transactions[date];
    // return <TransactionList transactionsOnDate={transactionsOnDate}/>
    if (transactionsOnDate[index].type === "Income") {
      return (
        <div className="border">
          <h1>+{transactionsOnDate[index].amount}</h1>
          <h1>{transactionsOnDate[index].category}</h1>
          <h1>{transactionsOnDate[index].note}</h1>
          <h1>{transactionsOnDate[index].type}</h1>
        </div>
      );
    } else {
      return (
        <div className="border">
          <h1>-{transactionsOnDate[index].amount}</h1>
          <h1>{transactionsOnDate[index].category}</h1>
          <h1>{transactionsOnDate[index].note}</h1>
          <h1>{transactionsOnDate[index].type}</h1>
        </div>
      );
    }
  });
  return <div>{renderDatesList}</div>;
};

export default TransactionList;
