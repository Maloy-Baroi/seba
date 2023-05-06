import {onHandleCartLength} from "@/pages/api/apis";
import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import ProductsMainBoard from "@/pages/seller/components/ProductsMainBoard";
import {useEffect, useState} from "react";

const Products = () => {
    const [cartLength, setCartLength] = useState(0);

    useEffect(() => {
        onHandleCartLength().then(r => setCartLength(r.length));
    }, [])

    return (
        <>
            <OnlyHead page={"Products"} />
            <main>
                <DashboardNavbar />
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"all_products"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <ProductsMainBoard />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}


export default Products
