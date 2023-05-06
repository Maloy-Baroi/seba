import MainboardHead from "@/pages/seller/components/MainboardHead";
import productStyle from "@/styles/productsPage.module.css";
import ImportProductsTable from "@/pages/seller/components/ImportProductsTable";
import {useState} from "react";

const ImportProductsMainBoard = () => {
    const [searchItem, setSearchItem] = useState("")

    const onHandleSearchChange = (e) => {
        setSearchItem(e.target.value);
    }

    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Product List"} h6Text={"Manage your products"} />
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <div className={"row mb-4"}>
                                <div className={"col-md-8"}>
                                    <input value={searchItem} onChange={onHandleSearchChange}
                                           className={productStyle.searchInputField} placeholder={"search "}/>
                                    <button className={"btn " + productStyle.searchBtn}>
                                        <i className={"fa fa-search"}></i>
                                    </button>
                                </div>
                                <div className={"col-md-4 " + productStyle.extraWork}>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ImportProductsTable searchValue={searchItem} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImportProductsMainBoard;
