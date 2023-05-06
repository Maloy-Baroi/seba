import {useRouter} from "next/router";
import Head from "next/head";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import DashboardMainBoard from "../manager/components/DashboardMainBoard";
import {useEffect} from "react";

const Dashboard = () => {
    const navigator = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            navigator.push('login/')
        }
    }, [])

    return (
        <>
            <Head>
                <title>Seba Pharmacy | Manager | Dashboard</title>
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
                        <DashboardMainBoard />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Dashboard;

