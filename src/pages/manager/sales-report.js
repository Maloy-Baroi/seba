import {getStockAlert} from "@/pages/api/app_data";
import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import InvoiceReportMainBoard from "@/pages/seller/components/InvoiceReportMainBoard";
import {useEffect, useState} from "react";

const SalesReport = () => {
    const [updateKey, setUpdateKey] = useState(0)

    const saveTotalStockAlerts = async () => {
        const alertQ = await getStockAlert()
        localStorage.setItem("total_alert_count", alertQ.length)
        setUpdateKey(prev => prev + 1)
    }

    useEffect(() => {
        saveTotalStockAlerts().then(r => true)
    }, [])

    return (
        <>
            <OnlyHead page={"Sales Report"}/>
            <main>
                <DashboardNavbar key={updateKey} />
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"sales-report"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <InvoiceReportMainBoard />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default SalesReport;
