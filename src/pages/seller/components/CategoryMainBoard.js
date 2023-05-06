import MainboardHead from "@/pages/seller/components/MainboardHead";
import productStyle from "@/styles/productsPage.module.css";
import CreateProductForm from "@/pages/seller/components/CreateProductForm";
import productsTableStyle from "@/styles/productTable.module.css";
import {useEffect, useState} from "react";
import {getCategoryList} from "@/pages/api/app_data";
import AddNewHeaderInMainBoard from "@/pages/seller/components/AddNewHeaderInMainBoard";
import CustomToast from "@/pages/manager/components/CustomToast";
import AddButton from "@/pages/manager/components/AddButton";

const CategoryMainBoard = () => {
    const [categories, setCategories] = useState([])
    const [searchItem, setSearchItem] = useState("")
    const [formShow, setFormShow] = useState(false)
    const [catName, setCatName] = useState("")
    const [toastShow, setToastShow] = useState(false)

    const fetchCategories = async () => {
        const allCategories = await getCategoryList();
        setCategories(allCategories);
    };

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
            name: catName
        };

        fetch('https://seba-backend.xyz/api-admin/create-categories/', {
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
                fetchCategories().then(r => true)
            })
            .catch(error => {
                console.error('Error creating brand:', error);
                // Handle the error
            });
    }

    const searchOption = (event) => {
        const searchValue = event.target.value;
        setSearchItem(searchValue);
        if (searchValue && searchValue.length > 0) {
            const filteredCategories = categories.filter(cat => cat.name.toLowerCase().includes(searchValue.toLowerCase()));
            setCategories(filteredCategories);
        } else {
            fetchCategories().then(r => true)
        }
    }

    useEffect(() => {
        fetchCategories().then(r => true)
    }, [])

    return (
        <>
            {toastShow ? <CustomToast message={"Successfully Added!"}/> : ""}
            <AddNewHeaderInMainBoard header6Text={"List of Generic Names"} header4Text={"Generic Name List"}
                                     addingThing={"Add new category"} onHandleShowForm={onHandleShowForm}/>
            <div className={"row"} style={formShow ? {
                display: "block",
                marginBottom: "20px"
            } : {
                display: "none"
            }
            } id={"categoryFormID"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <legend>Add New</legend>
                        <div className={"row"}>
                            <div className={"col-md-10"}>
                                <input type={"text"} className={"form-control mb-4"} placeholder={"Generic Name"}
                                       value={catName} onChange={e => setCatName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-md-10"}>
                                <AddButton btnWidth={"100%"} buttonName={"Add"} onHandleAddNew={onHandleAddNew}/>
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
                            <input value={searchItem} onChange={searchOption}
                                   className={"form-control w-50 mb-3"} placeholder={"search "}/>
                        </div>
                        <div>
                            <div className={"card " + productsTableStyle.cardBackground}>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">
                                        <b>All Generic</b>
                                    </h5>
                                    <div className={"mt-3"}>
                                        <table className={productsTableStyle.table}>
                                            <thead>
                                            <tr>
                                                <th scope="col">S.N.</th>
                                                <th scope="col">Generic Name</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                categories && categories.length > 0 ?
                                                categories.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td data-label="S.N.">{index + 1}</td>
                                                        <td data-label="Generic Name">{item.name}</td>
                                                    </tr>
                                                ))
                                                : <tr></tr>
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryMainBoard;
