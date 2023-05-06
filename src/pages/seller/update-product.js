import Head from "next/head";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import UpdateProductMainBoard from "@/pages/seller/components/UpdateProductMainBoard";
import {useState} from "react";

const UpdateProduct = () => {
    const [updateKey, setUpdateKey] = useState(0)

    const onHandleNotificationUpdate = () => {
        setUpdateKey(prev => prev+1)
    }

  return (
      <>
        <div>
            <Head>
                <title>Seba Pharmacy | Seller | Create New Products</title>
            </Head>
            <main>
                <DashboardNavbar key={updateKey} />
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar activeState={"update_products"}/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <UpdateProductMainBoard onHandleNotificationUpdate={onHandleNotificationUpdate} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
      </>
  );
}

export default UpdateProduct;

