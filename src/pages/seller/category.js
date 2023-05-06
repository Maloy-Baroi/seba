import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import CategoryMainBoard from "@/pages/seller/components/CategoryMainBoard";

const Category = () => {
    return (
        <>
            <OnlyHead page={"Category"} />
            <main>
                <DashboardNavbar />
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"category"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <CategoryMainBoard />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Category;
