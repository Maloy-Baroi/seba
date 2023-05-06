import {useEffect, useState} from 'react';
import Barchart from "@/pages/manager/components/Barchart";
import LineChart from "@/pages/manager/components/LineChart";
import PieChart from "@/pages/manager/components/PieChart";
import {getMonthSales} from "@/pages/api/app_data";
import TopSoldProductHorizontalBar from "@/pages/manager/components/TopSoldProductHorizontalBar";

const SalesAnalysisCharts = () => {
    return (
        <>
            <div className={"row"}>
                <div className={"col-md-6"}>
                    <Barchart />
                </div>
                <div className={"col-md-6"}>
                    <LineChart/>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-md-6"}>
                    <PieChart />
                </div>
                <div className={"col-md-6 mt-5"}>
                    <TopSoldProductHorizontalBar />
                </div>
            </div>
        </>
    );
};

export default SalesAnalysisCharts;
