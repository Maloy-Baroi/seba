import MainboardCard from "@/pages/seller/components/MainboardCard";
import DashboardTable from "@/pages/seller/components/DashboardTable";
import {useEffect, useState} from "react";
import {getBrandList, getCustomerSellerInvoiceCount} from "@/pages/api/app_data";

const DashboardMainBoard = () => {
    const [totalCustomer, setTotalCustomer] = useState(0)
    const [totalSeller, setTotalSeller] = useState(0)
    const [totalBrand, setTotalBrand] = useState(0)
    const [totalInvoice, setTotalInvoice] = useState(0)

    const getTotalBrands = async () => {
        const findTotalBrand = await getBrandList();
        setTotalBrand(findTotalBrand.length)
    }

    const getTotalCustomerSellerInvoice = async () => {
        const findTotalCustomer = await getCustomerSellerInvoiceCount();
        setTotalCustomer(findTotalCustomer['totalCustomers'])
        setTotalSeller(findTotalCustomer['totalSellers'])
        setTotalInvoice(findTotalCustomer['totalOrders'])
    }

    useEffect(() => {
        getTotalBrands().then(r => true)
        getTotalCustomerSellerInvoice().then(r => true)
    }, [])

    return (
        <>
            <div className={"row"}>
                <div className={"col-lg-3 col-md-6 col-sm-12"}>
                    <MainboardCard bgColor={"#FF9F43"} imageSrc={"fa-users"} altText={"Icon 1"}
                                   totalAmount={totalCustomer} titleText={"Customers"}/>
                </div>
                <div className={"col-lg-3 col-md-6 col-sm-12"}>
                    <MainboardCard bgColor={"#00CFE8"} imageSrc={"fa-user"} altText={"Icon 1"}
                                   totalAmount={totalSeller}
                                   titleText={"Sellers"}/>
                </div>
                <div className={"col-lg-3 col-md-6 col-sm-12"}>
                    <MainboardCard bgColor={"#1B2850"} imageSrc={"fa fa-city"} altText={"Icon 1"}
                                   totalAmount={totalBrand}
                                   titleText={"Total Brand"}/>
                </div>
                <div className={"col-lg-3 col-md-6 col-sm-12"}>
                    <MainboardCard bgColor={"#28C76F"} imageSrc={"fa-folder-open"} altText={"Icon 1"}
                                   totalAmount={totalInvoice}
                                   titleText={"Total Invoice"}/>
                </div>
            </div>
            <div className={"row p-3"}>
                <DashboardTable/>
            </div>
        </>
    );
}

export default DashboardMainBoard;
