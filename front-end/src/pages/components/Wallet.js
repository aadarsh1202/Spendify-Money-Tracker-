import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import classes from "./css/wallet.module.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
  {
    value: "INR",
    label: "₹",
  },
];

const Wallet = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("INR");
  const [walletName, setWalletName] = useState("");
  const [intialBalance, setIntialBalance] = useState(0);

  const handleWalletNameChange = (event) => {
    setWalletName(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleIntialBalanceChange = (event) => {
    setIntialBalance(event.target.value);
  };
  const createWallet = (event) => {
    event.preventDefault();

    const walletData = {
      wallet_name: walletName,
      currency_type: currency,
      initial_balance: intialBalance,
      id: localStorage.getItem("id"),
    };

    console.log(walletData);

    axios
      .put("https://money-tracker-22.herokuapp.com/wallet", walletData)
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("loginData", JSON.stringify(response.data.data));
        console.log(response.data.message);
        console.log(response.data.data.id);
        localStorage.setItem("id", response.data.data.id);
        // if (response.data.message === "user added") {
        //   navigate("/wallet");
        // } else {
        //   navigate("/home");
        // }
        navigate("/home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  bg-primary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink className="navbar-brand" exact to="/">
              <h3>Money Tracker</h3>
            </NavLink>
          </div>
        </div>
      </nav>
      <section>
        <div className="container">
          <div className={classes.box}>
            <div className={`row ${classes.p}`}>
              <div className="row my-2">
                <h4 className={classes.a}>Add a Wallet first!!!</h4>
                <hr></hr>
              </div>
              <div className="row my-3">
                <div className="col">
                  <TextField
                    id="outlined-basic"
                    label="Wallet name"
                    variant="outlined"
                    placeholder="Your wallet name"
                    sx={{ width: 400 }}
                    value={walletName}
                    onChange={handleWalletNameChange}
                  />
                </div>
                <div className="row my-2 ">
                  <div className="col-6 col-sm-5 ">
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select"
                      value={currency}
                      onChange={handleCurrencyChange}
                      helperText="Please select your currency"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label} {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="col-6 col-sm-5">
                    <TextField
                      id="outlined-basic"
                      label="Initial Balance"
                      variant="outlined"
                      sx={{ width: 200 }}
                      value={intialBalance}
                      onChange={handleIntialBalanceChange}
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <button
                    className="btn btn-outline-dark"
                    type="submit"
                    onClick={createWallet}
                  >
                    Add Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wallet;
