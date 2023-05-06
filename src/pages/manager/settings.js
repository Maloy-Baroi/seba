import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import SettingsMainBoard from "@/pages/manager/components/SettingsMainBoard";

const Settings = () => {
    return (
        <>
            <OnlyHead page={"Selling Box"}/>
            <main>
                <DashboardNavbar />
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"settings"} />
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <SettingsMainBoard />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Settings
