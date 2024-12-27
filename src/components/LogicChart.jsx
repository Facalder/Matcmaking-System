"use client"

import { useState } from "react"
import ReactApexChart from "react-apexcharts";

export default function LogicChart({ runningTimeIterative, runningTimeRecursive }) {
    const [executionTimesIterative, setExecutionTimesIterative] = useState([])
    setExecutionTimesIterative(runningTimeIterative)

    const [executionTimesRecursive, setExecutionTimesRecursive] = useState([])
    setExecutionTimesRecursive(runningTimeRecursive)

    const inputSize = [20, 7500, 1000, 10000, 100000];
    
    const [chartState, setChartState] = useState({
      series: [
        {
          name: "Iterative",
          data: inputSize,
        },
        {
          name: "Recursive",
          data: inputSize,
        },
      ],

      options: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,

          zoom: {
            enabled: true,
            type: "x",
            autoScaleYaxis: true,
          },
        },

        toolbar: {
          show: false,
        },

        colors: ["#77B6EA", "#545454"],

        dataLabels: {
          enabled: true,
        },

        stroke: {
          curve: "smooth",
        },

        title: {
          text: "Running Time for Each Algorithms",
          align: "left",
        },

        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },

        markers: {
          size: 1,
        },

        xaxis: {
          categories: inputSize,
          title: {
            text: "Input Size",
          },
        },

        yaxis: {
          title: {
            text: "Running Time",
          },
          categories: [executionTimesIterative, executionTimesRecursive],
        },

        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    });

    return (
        <>
            <ReactApexChart options={chartState.options} type="line" series={chartState.series} height={320} />
        </>
    )
}