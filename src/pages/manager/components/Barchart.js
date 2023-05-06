import {useEffect, useState} from "react";
import {getMonthlyTotalSales, getMonthSales} from "@/pages/api/app_data";
import {Bar} from "react-chartjs-2";
import Chart from 'chart.js/auto';

const Barchart = () => {
    const [data, setData] = useState([]);

    const fetchMonthVsTotal = async () => {
        const allData = await getMonthlyTotalSales();
        setData(allData);
    };

    useEffect(() => {
        fetchMonthVsTotal().then(r => true);
    }, []);

    const chartData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: "No. of Sales",
                data: data.map((item) => item.no_of_sales),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: "category",
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Bar data={chartData} options={options}/>
        </div>
    );
};

export default Barchart;
