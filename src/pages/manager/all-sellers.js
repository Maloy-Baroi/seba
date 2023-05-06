import Head from "next/head";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import AllSellerDashboard from "@/pages/manager/components/AllSellerDashboard";

const AllSellers = () => {
    return (
        <>
            <Head>
                <title>Seba Pharmacy | Manager | All Sellers</title>
            </Head>
            <main>
                <DashboardNavbar />
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"all-sellers"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <AllSellerDashboard />
                    </div>
                </div>
            </main>
        </>
    );
}

export default AllSellers;
