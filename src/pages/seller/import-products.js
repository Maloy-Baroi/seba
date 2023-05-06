import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import ImportProductsMainBoard from "@/pages/seller/components/ImportProductsMainBoard";
import {useEffect} from "react";

const ImportProducts = () => {

    return (
        <>
            <OnlyHead page={"Category"}/>
            <main>
                <DashboardNavbar/>
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"import-products"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <ImportProductsMainBoard />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ImportProducts;
