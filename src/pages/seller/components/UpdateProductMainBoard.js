import MainboardHead from "@/pages/seller/components/MainboardHead";
import productStyle from "@/styles/productsPage.module.css";
import UpdateProductForm from "@/pages/seller/components/UpdateProductForm";

const UpdateProductMainBoard = ({onHandleNotificationUpdate}) => {
    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Product Update"} h6Text={"Update product stock"}/>
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <div className={"row mb-4"}>
                                <div className={"col-md-8"}>

                                </div>
                                <div className={"col-md-4 " + productStyle.extraWork}>

                                </div>
                            </div>
                        </div>
                        <div>
                            <UpdateProductForm onHandleNotificationUpdate={onHandleNotificationUpdate} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateProductMainBoard;
