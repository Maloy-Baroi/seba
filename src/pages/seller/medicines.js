import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import ProductsMainBoard from "@/pages/seller/components/ProductsMainBoard";
import MedicinesMainBoard from "@/pages/seller/components/MedicinesMainBoard";
import {useState} from "react";

const Medicines = () => {
    const [dashCounter, setDashCounter] = useState(0)

    const recallDashboard = () => {
        setDashCounter(prevState => prevState+1)
    }

    return (
        <>
            <OnlyHead page={"Products"} />
            <main>
                <DashboardNavbar key={dashCounter} />
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"all_medicines"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <MedicinesMainBoard recallDashboard={recallDashboard} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Medicines;
