// import React from "react";
import { Chart } from "react-google-charts";

const data = [
    ["Task", "Hours per Day"],
    ["Total Spending", 600],
    ["Total Savings", 1000],
  ];
  
const options = {
    title: "Savings Plan",
    titleTextStyle: {
        fontSize: 30,  
        bold: true, 
      },
    pieHole: 0.4,
    is3D: false,
    fontSize: 20,
    colors: ["#d35050", "#067c1c"],
    backgroundColor: "transparent",
    chartArea: {
        left: 20, // Spacing from the left
        top: 70,  // Spacing from the top
        width: "100%",  // Chart area width
        height: "100%", // Chart area height
      },
  };

export default function PieChart() {

    return (
        <>
            <div className="piechart">
                <Chart
                chartType="PieChart"
                width="550px"
                height="500px"
                data={data}
                options={options}
                />
            </div>
        </>
    )
}