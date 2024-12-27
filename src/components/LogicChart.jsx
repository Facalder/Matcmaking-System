"use client"

import { useState, useEffect } from "react"
import ReactApexChart from "react-apexcharts";

export default function LogicChart() {
    const inputSize = [10, 100, 1000, 10000];
    const [executionTimesIterative, setExecutionTimesIterative] = useState([]);
    const [executionTimesRecursive, setExecutionTimesRecursive] = useState([]);

    useEffect(() => {
        testPerformance();
        testPerformanceRecursive();
    }, []);

    const testPerformance = () => {
        const times = inputSize.map(size => {
            const startTime = performance.now();
            const players = randomizePlayer(size);
            createBalancedTeamIterative(players);
            const endTime = performance.now();
            return endTime - startTime;
        });
        setExecutionTimesIterative(times);
    };

    const testPerformanceRecursive = () => {
        const times = inputSizes.map(size => {
            const startTime = performance.now();
            const players = randomizePlayer(size);
            createBalancedTeamRecursive(players);
            const endTime = performance.now();
            return endTime - startTime;
        });
        setExecutionTimesRecursive(times);
    };

    const chartState = {
        series: [
            {
                name: "Iterative",
                data: executionTimesIterative,
            },
            {
                name: "Recursive",
                data: executionTimesRecursive,
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
                text: "Running Time for Each Algorithm",
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
                categories: inputSizes,
                title: {
                    text: "Input Size",
                },
            },
            yaxis: {
                title: {
                    text: "Running Time (ms)",
                },
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
    };

    return (
        <>
            <ReactApexChart options={chartState.options} type="line" series={chartState.series} height={320} />
        </>
    );
}