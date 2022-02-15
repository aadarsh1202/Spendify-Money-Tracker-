import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Navbar from "./components/Navbar";
import TransactionFilter from "./components/TrasactionFilter";
import axios from "axios";
import TransactionTable from "./components/TransactionTable";

const Transaction = () => {
  const expenseCategory = [
    {
      value: "Food",
      label: "$",
    },
    {
      value: "Transport",
      label: "€",
    },
  ];
  const incomeCategory = [
    {
      value: "Salary",
      label: "$",
    },
    {
      value: "Other Income",
      label: "€",
    },
  ];
  const types = [
    {
      value: "Income",
      label: "+",
    },
    {
      value: "Expense",
      label: "-",
    },
  ];


  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [trasactionForm, setTrasactionForm] = useState(false)
  const [categoryEmpty, setCategoryEmpty] = useState(false)
  const [dateEmpty, setDateEmpty] = useState(false)
  const [amountEmpty, setAmountEmpty] = useState(false)
  const [transactionFilter, setTransactionFilter] = useState(false);
  const [transactions, setTransactions] = useState({'message' : "data not found"});

  useEffect(() => {
    console.log(transactions)
  }, [transactions]);

  const handleTransactionFormView = () => {
    setTrasactionForm(!trasactionForm)
  }
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setCategoryEmpty(false)
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setAmountEmpty(false)
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleDateChange = (event) => {
    // const newDate = event.target.value.split("-").reverse().join("/");
    setDate(event.target.value);
    setDateEmpty(false)
    // console.log(date);
  };
  const handleTransactionFilter = () => {
    setTransactionFilter(!transactionFilter)
  }

  const handleCancel = () => {
    setType("Income");
    setCategory("");
    setAmount(0);
    setNote("");
    setDate("");
    setTrasactionForm(false)
  };

  const handleSave = (event) => {
    event.preventDefault();
    const data = JSON.parse(localStorage.getItem("loginData"));
    const transaction = {
      id: localStorage.getItem("id"),
      walletname: data.wallet_name,
      type: type,
      category: category,
      amount: amount,
      note: note,
      date: date,
    };
    console.log(transaction);
    if (category !== "" && date !== "" && amount > 0) {
      axios
        .post("https://money-tracker-22.herokuapp.com/addtransactions", transaction)
        .then(function (response) {
          console.log(response.data);

          console.log(response.data.message);
        })
        .catch(function (error) {
          console.log(error);
        });
      handleCancel();
      setTrasactionForm(false)
    }
    else {
      if (category === "") {
        setCategoryEmpty(true)
      }

      else if (amount <= 0) {
        setAmountEmpty(true)
      }
      else {
        setDateEmpty(true)
      }
    }

  };

  return (
    <>
      <Navbar />

      {trasactionForm ? (
        <form className="container mt-5" >
          <TextField
            id="outlined-select-currency"
            select
            label="Type"
            helperText="Please select your type"
            onChange={handleTypeChange}
            value={type}
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label} {option.value}
              </MenuItem>
            ))}
          </TextField>

          {type === "Income" ? (
            <TextField
              id="outlined-select-currency"
              select
              label="Category"
              helperText={categoryEmpty ? "This field is required" : "Please select your category"}
              error={categoryEmpty ? true : false}
              value={category}
              onChange={handleCategoryChange}
            >
              {incomeCategory.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label} {option.value}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              id="outlined-select-currency"
              select
              label="Category"
              helperText="Please select your category"
              value={category}
              onChange={handleCategoryChange}
            >
              {expenseCategory.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label} {option.value}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            id="outlined-basic"
            label="Amount"
            type="number"
            helperText={amountEmpty ? "Please enter amount greater than 0" : ""}
            error={amountEmpty ? true : false}
            InputProps={{ inputProps: { min: 1 } }}
            value={amount}
            onChange={handleAmountChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Note"
            id="outlined-basic"
            value={note}
            onChange={handleNoteChange}
            variant="outlined"
            placeholder="Additional details about transaction"
          />

          <TextField
            id="date"
            label="Date"
            type="date"
            helperText={dateEmpty ? "This field is required" : "Please select the date of transaction"}
            error={dateEmpty ? true : false}
            required={true}
            onChange={handleDateChange}
            value={date}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-outline-success"
            onClick={handleSave}
          >
            Save
          </button>
        </form>
      ) : (
        <div className="container my-5 border">
          <button type="button" className="btn btn-success my-3 mx-3" onClick={handleTransactionFormView}>Add Transaction</button>
          <button type="button" className="btn btn-outline-primary" onClick={handleTransactionFilter}>{transactionFilter ? "Hide Filter" : "Filter"}</button>
          {transactionFilter ? (<div className="container border pt-3"><TransactionFilter setTransactions={setTransactions} /></div>) : <div />}
          
          
            {transactions.message === "data not found"  ? <h1>Data Not Found</h1>:<TransactionTable transactions={transactions.data} />}
  
        </div>
      )}

    </>
  );
};

export default Transaction;
