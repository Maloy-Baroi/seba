import Head from "next/head";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import Sidebar from "@/pages/seller/components/Sidebar";
import dashboardStyle from "../../styles/dashboard.module.css";
import DashboardMainBoard from "@/pages/seller/components/DashboardMainBoard";
import {useEffect} from "react";
import {useRouter} from "next/router";

const Dashboard = () => {
    const navigator = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            navigator.push('/login/')
        }
    }, [])

    return (
        <>
            <Head>
                <title>Seba Pharmacy | Seller | Dashboard</title>
            </Head>
            <main>
                <DashboardNavbar />
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"dashboard"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <DashboardMainBoard/>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Dashboard;
