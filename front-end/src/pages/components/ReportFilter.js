import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import axios from "axios";


const ReportFilter = ({ setTransactions,months,filters,filterSelected,yearSelected,monthSelected,setFilterSelected,setMonthSelected,setYearSelected }) => {
    
    const [yearsList, setYearsList] = useState([]);
    
      useEffect(() => {
        // console.log(yearSelected, monthSelected);
        let currentYear = new Date().getFullYear();
        let listOfYears = [];
        for (let i = 0; i < 10; i++) {
          listOfYears[i] = currentYear - i;
        }
        console.log(listOfYears);
        setYearsList(listOfYears);
        // handleSubmit(event);
      }, []);
    
      const handleFilterChange = (event) => {
        setFilterSelected(event.target.value);
        setMonthSelected(new Date().getMonth());
        setYearSelected(new Date().getFullYear());
      };

      const handleMonthChange = (event) => {
        for (let i = 0; i < 12; i++) {
          if (months[i].value === event.target.value) {
            setMonthSelected(i);
          }
        }
        setYearSelected(new Date().getFullYear());
      };
    
      const handleYearChange = (event) => {
        handleSubmit(event);
      };
    
      const handleSubmit = (event) => {
        let url = "";
        let dataFilter = {};
        
        if (filterSelected === "Month") {
          setYearSelected(event.target.value);
          url = "https://money-tracker-22.herokuapp.com/chartdatabymonth";
          dataFilter = {
            month: months[monthSelected].index,
            year: event.target.value,
            id: localStorage.getItem("id"),
          };
        } else {
          setYearSelected(event.target.value);
          url = "https://money-tracker-22.herokuapp.com/chartdatabyyear";
          dataFilter = {
            year: event.target.value,
            id: localStorage.getItem("id"),
          };
        }
        console.log(dataFilter);
        axios
          .post(url, dataFilter)
          .then(function (response) {
            console.log(response.data);
            // if (response.data.message === "data found") {
            // console.log(response.data.data.income)
            setTransactions(response.data.data)
            // }
            // else {
            //   setTransactions("data not found")
            // }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      const secondFilter = () => {
        return (
          <>
            {filterSelected === "Month" ? (
              <div className="col-4 col-md-4 col-sm-12">
                <TextField
                  id="outlined"
                  select
                  fullWidth
                  label="Month Name"
                  value={months[monthSelected].value}
                  onChange={handleMonthChange}
                  helperText="Select Month"
                >
                  {Object.keys(months).map((monthIndex) => (
                    <MenuItem key={monthIndex} value={months[monthIndex].value}>
                      {months[monthIndex].value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            ) : (
              <div className="col-4 col-md-4 col-sm-12">
                <TextField
                  id="outlined"
                  select
                  fullWidth
                  label="Year"
                  value={yearSelected}
                  onChange={handleYearChange}
                  helperText="Select Product name"
                >
                  {Object.keys(yearsList).map((yearIndex) => (
                    <MenuItem key={yearIndex} value={yearsList[yearIndex]}>
                      {yearsList[yearIndex]}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            )}
    
            {filterSelected === "Month" ? (
              <div className="col-4 col-md-4 col-sm-12">
                <TextField
                  id="outlined"
                  select
                  fullWidth
                  label="Year"
                  value={yearSelected}
                  onChange={handleYearChange}
                  helperText="Select Product name"
                >
                  {Object.keys(yearsList).map((yearIndex) => (
                    <MenuItem key={yearIndex} value={yearsList[yearIndex]}>
                      {yearsList[yearIndex]}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            ) : (
              <></>
            )}
          </>
        );
      };
    
      return (
        <div className="container">
          <div className="row">
            <div className="col-4 col-md-4 col-sm-12">
              <TextField
                id="outlined"
                select
                fullWidth
                label="Filter by"
                value={filterSelected}
                onChange={handleFilterChange}
              >
                {Object.keys(filters).map((filter) => (
                  <MenuItem key={filter} value={filters[filter].value}>
                    {filters[filter].value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {secondFilter()}
          </div>
        </div>
      );
};

export default ReportFilter;
