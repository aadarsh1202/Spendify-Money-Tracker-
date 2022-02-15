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
                    type="button"
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