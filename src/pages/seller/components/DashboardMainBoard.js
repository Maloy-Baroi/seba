import MainboardCard from "@/pages/seller/components/MainboardCard";
import DashboardTable from "@/pages/seller/components/DashboardTable";
import {getOrderListForLoginUser} from "@/pages/api/app_data";
import {useEffect, useState} from "react";

const DashboardMainBoard = () => {
    const [totalSellAmount, setTotalSellAmount] = useState(0)
    const [totalCompletedOrder, setTotalCompletedOrder] = useState(0)
    const [onCreditSell, setOnCreditSell] = useState(0)

    const totalCompletedOrderAmount = async () => {
        const sellingQuantity = await getOrderListForLoginUser();
        let total = 0;
        let onCreditCount = 0;
        sellingQuantity.map(item => {
            total += parseInt(item.total_price);
            item.payment_method === "On Credit" ? onCreditCount++ : ""
        })
        setTotalSellAmount(total)
        setOnCreditSell(onCreditCount)
        setTotalCompletedOrder(sellingQuantity.length);
    }

    useEffect(() => {
        totalCompletedOrderAmount().then(r => true)
    }, [])

    return (
        <>
            <div className={"m-2 p-2"}>
                <div className={"row"}>
                    <div className={"col-lg-3 col-md-6 col-sm-12"}>
                        <MainboardCard bgColor={"#FF9F43"} imageSrc={"fa-briefcase"} altText={"Icon 1"}
                                       totalAmount={totalCompletedOrder} titleText={"Total Completed Orders"}/>
                    </div>
                    <div className={"col-lg-3 col-md-6 col-sm-12"}>
                        <MainboardCard bgColor={"#00CFE8"} imageSrc={"fa-bangladeshi-taka-sign"} altText={"Icon 1"}
                                       totalAmount={totalSellAmount}
                                       titleText={"Total Selling Amount"}/>
                    </div>
                    <div className={"col-lg-3 col-md-6 col-sm-12"}>
                        <MainboardCard bgColor={"#1B2850"} imageSrc={"fa fa-hand-holding-usd"} altText={"Icon 1"} totalAmount={onCreditSell}
                                       titleText={"Total Sells on Credit"}/>
                    </div>
                    <div className={"col-lg-3 col-md-6 col-sm-12"}>
                        <MainboardCard bgColor={"#28C76F"} imageSrc={"fa-star"} altText={"Icon 1"} totalAmount={"5"}
                                       titleText={"Your Average Performance"}/>
                    </div>
                </div>
                <div className={"row p-3"}>
                    <DashboardTable/>
                </div>
            </div>
        </>
    );
}

export default DashboardMainBoard;
