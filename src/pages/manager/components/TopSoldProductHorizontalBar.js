import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {getMostSoldProduct} from "@/pages/api/app_data";

const TopSoldProductHorizontalBar = () => {
    const [soldProducts, setSoldProducts] = useState([]);

    const fetchMostSoldProduct = async () => {
        const allSoldProduct = await getMostSoldProduct();
        setSoldProducts(allSoldProduct);
    };

    useEffect(() => {
        fetchMostSoldProduct().then(r => true);
        const backgroundColors = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(128, 0, 0, 0.2)',
            'rgba(255, 0, 0, 0.2)',
            'rgba(255, 255, 0, 0.2)',
            'rgba(0, 128, 0, 0.2)',
            'rgba(0, 255, 0, 0.2)',
            'rgba(0, 0, 128, 0.2)',
            'rgba(0, 0, 255, 0.2)',
            'rgba(128, 128, 128, 0.2)',
            'rgba(255, 165, 0, 0.2)',
            'rgba(128, 128, 0, 0.2)',
            'rgba(0, 128, 128, 0.2)',
            'rgba(128, 0, 128, 0.2)',
            'rgba(0, 0, 0, 0.2)',
        ];
    }, []);

    const getChartLabels = () => soldProducts.map((product) => product.name);
    const getChartData = () => soldProducts.map((product) => product.numbers);

    const data = {
        labels: getChartLabels(),
        datasets: [
            {
                label: 'Number of Sales',
                data: getChartData(),
                backgroundColor: [
                    'rgba(255,99,132,0.32)',
                    'rgba(255,159,64,0.32)',
                    'rgba(255,205,86,0.32)',
                    'rgba(75,192,192,0.32)',
                    'rgba(54, 162, 235, 0.32)',
                    'rgba(153, 102, 255, 0.32)',
                    'rgba(201, 203, 207, 0.32)',
                    'rgba(128, 0, 0, 0.32)',
                    'rgba(255, 0, 0, 0.32)',
                    'rgba(255, 255, 0, 0.32)',
                    'rgba(0, 128, 0, 0.32)',
                    'rgba(0, 255, 0, 0.32)',
                    'rgba(0, 0, 128, 0.32)',
                    'rgba(0, 0, 255, 0.32)',
                    'rgba(128, 128, 128, 0.32)',
                    'rgba(255, 165, 0, 0.32)',
                    'rgba(128, 128, 0, 0.32)',
                    'rgba(0, 128, 128, 0.32)',
                    'rgba(128, 0, 128, 0.32)',
                    'rgba(0, 0, 0, 0.32)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                beginAtZero: true,
                stepSize: 1,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default TopSoldProductHorizontalBar;
