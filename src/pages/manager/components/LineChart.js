import { useEffect, useState } from "react";
import styles from "@/styles/LineChart.module.css";
import {getMonthlyTotalSales, getMonthSales} from "@/pages/api/app_data";
import { Line } from "react-chartjs-2";

const LineChart = () => {
    const [profitData, setProfitData] = useState([]);

    const fetchMonthVsTotal = async () => {
        const allData = await getMonthSales();
        setProfitData(allData);
    };

    useEffect(() => {
        fetchMonthVsTotal().then(r => true);
    }, []);

    const chartData = {
        labels: profitData.map((item) => item.month),
        datasets: [
            {
                label: "Profit Graph",
                data: profitData.map((item) => item.total_sell),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderDash: [5, 5],
                },
            },
        },
    };

    return (
        <div className={styles.chartContainer}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineChart;
