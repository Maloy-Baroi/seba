import MainboardHead from "@/pages/seller/components/MainboardHead";
import SellerProfileForm from "@/pages/seller/components/SellerProfileForm";
import ManagerProfileForm from "@/pages/manager/components/ManagerProfileForm";

const SettingsMainBoard = () => {
    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Settings"} h6Text={"Manage your profile"}/>
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <ManagerProfileForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingsMainBoard;
