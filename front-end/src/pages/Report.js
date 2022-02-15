import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import ReportFilter from "./components/ReportFilter";
// import { HorizontalBar } from 'react-chartjs-2';

const Report = () => {
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

  const filters = [
    {
      value: "Month",
    },
    {
      value: "Year",
    },
  ];

  const [filterSelected, setFilterSelected] = useState("Month");
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
  const [transactions, setTransactions] = useState({
    message: "data not found",
  });

  var daysInMonth = []
  useEffect(() => {
    let days = new Date(yearSelected, monthSelected + 1, 0).getDate();
    console.log(monthSelected)
    for (let i = 0; i < days; i++) {
      daysInMonth.push(i + 1);
    }
    console.log(daysInMonth)
  }, [monthSelected])

  const data = {
    labels: daysInMonth,
    previousDate: {
      // label: "08/10/2019 - 09/30/2019",
      dataSet: [
        0, 0, 10000, 150000, 10000, 150000, 10000, 150000, 10000, 150000, 10000,
        150000, 10000, 150000, 10000, 150000, 10000, 150000, 10000, 150000,
        10000, 150000, 10000, 150000, 10000, 150000, 10000, 150000,
      ],
    },
    currentDate: {
      // label: "10/01/2019 - 11/20/2019",
      dataSet: [
        10000, 225000, 10000, 225000, -100000, 150000, 10000, 150000, 10000,
        150000, 10000, 150000, 10000, 150000, 10000, 150000, 10000, 150000,
        10000, 150000, 10000, 150000, 10000, 150000, 10000, 150000, 10000,
        150000,
      ],
    },
  };
  return (
    <div>
      <Navbar />
      <div className="container border pt-3">
        <ReportFilter
          setTransactions={setTransactions}
          months={months}
          filters={filters}
          setFilterSelected={setFilterSelected}
          setMonthSelected={setMonthSelected}
          setYearSelected={setYearSelected}
          filterSelected={filterSelected}
          monthSelected={monthSelected}
          yearSelected={yearSelected}
        />
      </div>

      <div className="">
        <Line
          pointstyle="star"
          data={{
            labels: data.labels,
            responsive: true,
            offset: true,
            datasets: [
              {
                label: "Income",
                pointStyle: "rectRounded",
                backgroundColor: "#6ED3FF",
                barThickness: 40,
                categoryPercentage: 1,
                borderColor: "#6ED3FF",
                data: data.previousDate.dataSet, //From API
              },
              {
                label: "Expense",
                backgroundColor: "#FF0000",
                borderColor: "#FF0000",
                barThickness: 40,
                categoryPercentage: 1,
                pointStyle: "triangle",
                data: data.currentDate.dataSet, //From API
              },
            ],
          }}
          height={400}
          options={{
            //
            offsetGridLines: true,
            drawTicks: true,
            layout: {
              padding: {
                top: 30,
                right: 40,
                bottom: 40,
              },
            },
            legend: {
              display: true,
              position: "right",
              align: "start",
              labels: {
                usePointStyle: true,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: {
                stacked: true,
                ticks: {
                  padding: 5,
                },
                gridLines: {
                  display: false,
                },
              },
              yAxes: {
                stacked: false,
                gridLines: {
                  drawBorder: false,
                },
                ticks: {
                  beginAtZero: true,
                  maxTicksLimit: 6,
                  padding: 20,
                  callback(n) {
                    if (n < 1e3) return n;
                    if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
export default Report;
