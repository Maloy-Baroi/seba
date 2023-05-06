import MainboardHead from "@/pages/seller/components/MainboardHead";
import productStyle from "@/styles/productsPage.module.css";
import CreateProductForm from "@/pages/seller/components/CreateProductForm";
import productFormStyle from "@/styles/productForm.module.css";
import {useState} from "react";
import CreateMedicineForm from "@/pages/seller/components/CreateMedicineForm";

const CreateProductMainBoard = () => {
    const [medicineFormShow, setMedicineFormShow] = useState(false)

    const onHandleFormChange = () => {
        console.log(medicineFormShow)
        setMedicineFormShow(!medicineFormShow)
    }

    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Product Add"} h6Text={"Create new product"}/>
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <div className={"row mb-4"}>
                                <div className={"col-md-8"}>

                                </div>
                                <div className={"col-md-4 " + productStyle.extraWork}>
                                    <div style={{
                                        display: "inline-flex"
                                    }}>
                                        {
                                            medicineFormShow ?
                                                <>
                                                    Medicine &nbsp;
                                                    <label className={productStyle.labelSwitch}>
                                                        <input type={"checkbox"} checked={medicineFormShow}
                                                               onChange={onHandleFormChange}/>
                                                        <span
                                                            className={`${productStyle.checkboxSlider} ${productStyle.checkboxRound}`}></span>
                                                    </label>
                                                    &nbsp;
                                                    <b>Others</b>
                                                </>
                                                :
                                                <>
                                                    <b>Medicine</b> &nbsp;
                                                    <label className={productStyle.labelSwitch}>
                                                        <input type={"checkbox"} checked={medicineFormShow}
                                                               onChange={onHandleFormChange}/>
                                                        <span
                                                            className={`${productStyle.checkboxSlider} ${productStyle.checkboxRound}`}></span>
                                                    </label>
                                                    &nbsp;
                                                    Others
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                medicineFormShow ?
                                    <CreateProductForm/>
                                    :
                                    <CreateMedicineForm />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProductMainBoard;
