import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import ImportProductsMainBoard from "@/pages/seller/components/ImportProductsMainBoard";
import PurchaseReportMainBoard from "@/pages/seller/components/PurchaseReportMainBoard";

const PurchaseReport = () => {
    return (
        <>
            <OnlyHead page={"Purchased Product"}/>
            <main>
                <DashboardNavbar/>
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"purchase-report"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <PurchaseReportMainBoard />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default PurchaseReport;
