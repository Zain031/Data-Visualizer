import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChartPolar = ({ stats }) => {
    if (!Array.isArray(stats) || stats.length === 0) {
        return <p>No stats data available</p>;
    }

    // Extract base_stat values and stat names
    const series = stats.map((stat) => stat.base_stat);
    const labels = stats.map((stat) => stat.stat.name);

    // Calculate relevant sums for categorization
    const tankStats =
        stats.find((stat) => stat.stat.name === "hp")?.base_stat ||
        0 + stats.find((stat) => stat.stat.name === "defense")?.base_stat ||
        0 +
            stats.find((stat) => stat.stat.name === "special-defense")
                ?.base_stat ||
        0;

    const attackerStats =
        stats.find((stat) => stat.stat.name === "attack")?.base_stat ||
        0 +
            stats.find((stat) => stat.stat.name === "special-attack")
                ?.base_stat ||
        0 + stats.find((stat) => stat.stat.name === "speed")?.base_stat ||
        0;

    // Determine category
    const category = tankStats > attackerStats ? "DEFENDER" : "ATTACKER";

    console.log(series, "================>");

    const [chartOptions] = useState({
        chart: {
            type: "polarArea",
        },
        stroke: {
            colors: ["#fff"],
        },
        fill: {
            opacity: 0.8,
        },
        labels: labels,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    });

    return (
        <div className="w-[30rem] mt-4">
            <div id="chart">
                <ReactApexChart
                    options={chartOptions}
                    series={series}
                    type="polarArea"
                />
            </div>
            <div id="html-dist"></div>
            <div className="flex justify-center w-[80%] ml-4 bg-blue-500 mt-4 rounded-md p-2 gap-10 ">
                {category === "ATTACKER" ? (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/8037/8037103.png"
                        alt=""
                        width={100}
                    />
                ) : (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/8037/8037114.png"
                        alt=""
                        width={100}
                    />
                )}
                <p className="font-bold items-center text-4xl pt-6 text-white">{category }</p>
            </div>
        </div>
    );
};

export default ApexChartPolar;
