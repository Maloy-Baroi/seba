import Head from "next/head";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import Sidebar from "@/pages/seller/components/Sidebar";
import dashboardStyle from "@/styles/dashboard.module.css";
import ProductsMainBoard from "@/pages/seller/components/ProductsMainBoard";
import {useEffect, useState} from "react";
import OnlyHead from "@/pages/seller/components/OnlyHead";
import {onHandleCartLength} from "@/pages/api/apis";

const Products = () => {
    const [cartLength, setCartLength] = useState(0);
    const [dashCounter, setDashCounter] = useState(0)

    const recallDashboard = () => {
        setDashCounter(prevState => prevState + 1)
    }

    useEffect(() => {
        onHandleCartLength().then(r => setCartLength(r.length));
    }, [cartLength])

    return (
        <>
            <OnlyHead page={"Products"}/>
            <main>
                <DashboardNavbar key={dashCounter}/>
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"all_products"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <ProductsMainBoard onHandleCartLength={onHandleCartLength}
                                               recallDashboard={recallDashboard}/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Products;
