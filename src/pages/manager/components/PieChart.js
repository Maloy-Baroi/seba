import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import styles from "@/styles/PieChart.module.css";
import {getMonthlyTotalSales, getPaymentMethodPercentage} from "@/pages/api/app_data";

const PieChart = () => {
    // const data = [
    //     { label: "Cash", value: 50 },
    //     { label: "Bkash", value: 20 },
    //     { label: "On Credit", value: 30 },
    //     { label: "Credit Card", value: 10 },
    //     { label: "Debit Card", value: 15 },
    // ];
    const [data, setData] = useState([]);

    const fetchPaymentMethodTotal = async () => {
        const allData = await getPaymentMethodPercentage();
        setData(allData);
    };

    useEffect(() => {
        fetchPaymentMethodTotal().then(r => true);
    }, []);

    const chartData = {
        labels: data.map((item) => item.payment_method),
        datasets: [
            {
                data: data.map((item) => item.total_orders),
                backgroundColor: [
                    'rgba(255,99,132,0.9)',
                    'rgba(255,159,64,0.9)',
                    'rgba(0, 0, 128, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(255, 0, 0, 0.9)',
                    'rgba(255, 255, 0, 0.9)',
                    'rgba(128, 0, 0, 0.9)',
                    'rgba(0, 255, 0, 0.9)',
                    'rgba(201, 203, 207, 0.9)',
                    'rgba(0, 128, 0, 0.9)',
                    'rgba(255,205,86,0.9)',
                    'rgba(75,192,192,0.9)',
                    'rgba(128, 128, 128, 0.9)',
                    'rgba(255, 165, 0, 0.9)',
                    'rgba(0, 0, 255, 0.9)',
                    'rgba(128, 128, 0, 0.9)',
                    'rgba(0, 128, 128, 0.9)',
                    'rgba(128, 0, 128, 0.9)',
                    'rgba(0, 0, 0, 0.9)'
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
            },
        },
    };

    return (
        <div className={styles.chartContainer}>
            <Pie data={chartData} options={options} className={styles.chart} />
        </div>
    );
};

export default PieChart;
