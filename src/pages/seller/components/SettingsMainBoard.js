import MainboardHead from "@/pages/seller/components/MainboardHead";
import productStyle from "@/styles/productsPage.module.css";
import Image from "next/image";
import pdf from "@/assets/icons/pdf.svg";
import excel from "@/assets/icons/excel.svg";
import printer from "@/assets/icons/printer.svg";
import ProductsTable from "@/pages/seller/components/ProductsTable";
import SellerProfileForm from "@/pages/seller/components/SellerProfileForm";

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
                            <SellerProfileForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingsMainBoard;
