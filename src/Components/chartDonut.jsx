import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChartDonut = ({ stats = [] }) => {
    const statValues = stats.map((stat) => stat.base_stat);
    const statNames = stats.map((stat) => stat.stat.name);

    const [options, setOptions] = useState({
        chart: {
            type: "donut",
        },
        labels: statNames,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: "100%",
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    });

    return (
        <>

            <div className="w-[30rem] mt-4">
                <div id="chart">
                    <ReactApexChart
                        options={options}
                        series={statValues}
                        type="donut"
                    />
                </div>
                <div id="html-dist"></div>
                <div className=" bg-red-500 px-4 py-2 rounded-md mt-4 w-[50%] text-white ml-14 hover:bg-red-600 hover:scale-105 hover:duration-200 hover:cursor-pointer font-bold">compare with other pokemon ?</div>
            </div>

        </>
    );
};

export default ApexChartDonut;
