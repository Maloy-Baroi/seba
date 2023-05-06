import MainboardHead from "@/pages/seller/components/MainboardHead";
import productStyle from "@/styles/productsPage.module.css";
import ShelfTableStyle from "@/styles/shelfPage.module.css";
import {useEffect, useState} from "react";
import {getShelfList} from "@/pages/api/app_data";
import AddNewHeaderInMainBoard from "@/pages/seller/components/AddNewHeaderInMainBoard";
import AddButton from "@/pages/manager/components/AddButton";
import CustomToast from "@/pages/manager/components/CustomToast";

const ShelfMainBoard = () => {
    const [shelvesList, setShelvesList] = useState([])
    const [formShow, setFormShow] = useState(false)
    const [shelfNo, setShelfNo] = useState("")
    const [rowNo, setRowNo] = useState("")
    const [colNo, setColNo] = useState("")
    const [toastShow, setToastShow] = useState(false)

    const onHandleShowForm = () => {
        setFormShow(!formShow)
    }

    function showToast() {
        setToastShow(!toastShow)
        setTimeout(() => {
            setToastShow(false);
        }, 3000);
    }

    const onHandleAddNew = () => {
        const brandData = {
            number: shelfNo,
            row: rowNo,
            column: colNo
        };

        fetch('https://seba-backend.xyz/api-admin/create-shelves/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token") // Replace YOUR_TOKEN_HERE with the actual bearer token
            },
            body: JSON.stringify(brandData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                showToast()
                onHandleShowForm()
                fetchShelfList().then(r => true)
            })
            .catch(error => {
                console.error('Error creating brand:', error);
                // Handle the error
            });
    }

    const fetchShelfList = () => {
        getShelfList().then(r => {
            setShelvesList(r);
        })
    }

    useEffect(() => {
        fetchShelfList()
    }, [])

    return (
        <>
            {toastShow ? <CustomToast message={"Successfully Added!"} /> : ""}
            <AddNewHeaderInMainBoard header4Text={"Shelves"} header6Text={"Manage all the shelves"}
                                     addingThing={"Shelf"} onHandleShowForm={onHandleShowForm} />
            <div className={"row"} style={formShow ? {
                display: "block",
                marginBottom: "20px"
            } : {
                display: "none"
            }
            } id={"companyFormID"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <legend>Add New</legend>
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <input type={"text"} className={"form-control"} placeholder={"Shelf No."}
                                       value={shelfNo} onChange={e => setShelfNo(e.target.value)}
                                />
                            </div>
                            <div className={"col-md-4"}>
                                <input type={"text"} className={"form-control"} placeholder={"Row No."}
                                       value={rowNo} onChange={e => setRowNo(e.target.value)}
                                />
                            </div>
                            <div className={"col-md-4"}>
                                <input type={"text"} className={"form-control"} placeholder={"Column No."}
                                       value={colNo} onChange={e => setColNo(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={"row mt-3"}>
                            <div className={"col-md-12"}>
                                <AddButton btnWidth={"100%"} buttonName={"Add"} onHandleAddNew={onHandleAddNew} />
                            </div>
                        </div>
                    </div>
                </div>
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
                            <table className={ShelfTableStyle.table}>
                                <thead>
                                <tr>
                                    <th scope="col">S.N.</th>
                                    <th scope="col">Shelf No.</th>
                                    <th scope="col">Row</th>
                                    <th scope="col">Column</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    shelvesList.length > 0 ?
                                    shelvesList.map((shelf, index) => (
                                        <tr key={shelf.id} style={index % 2 === 0 ?
                                            {
                                                backgroundColor: "rgba(255, 159," + index + 10 + ", 0.78)"
                                            } :
                                            {
                                                backgroundColor: "rgba(255, 159," + index + 15 + ", 0.78)"
                                            }
                                        }>
                                            <td data-label="S.N.">{index}</td>
                                            <td data-label="Shelf">
                                                {shelf.number}
                                            </td>
                                            <td data-label="Row">
                                                {shelf.row}
                                            </td>
                                            <td data-label="Column">
                                                {shelf.column}
                                            </td>
                                        </tr>
                                    ))
                                    : ""
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShelfMainBoard;
