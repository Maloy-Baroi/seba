import MainboardHead from "@/pages/seller/components/MainboardHead";
import brandStyle from "@/styles/BrandsPage.module.css";
import brandsTableStyle from "@/styles/brandTable.module.css";
import {useEffect, useState} from "react";
import {getBrandList, getSubCategoryList} from "@/pages/api/app_data";
import AddNewHeaderInMainBoard from "@/pages/seller/components/AddNewHeaderInMainBoard";
import CustomToast from "@/pages/manager/components/CustomToast";
import AddButton from "@/pages/manager/components/AddButton";

const SubCategoryMainBoard = () => {
    const [subCategory, setSubCategory] = useState([])
    const [searchItem, setSearchItem] = useState("")
    const [formShow, setFormShow] = useState(false)
    const [subCatName, setSubCatName] = useState("")
    const [toastShow, setToastShow] = useState(false)

    const fetchSubCategoryList = async () => {
        const allSubCategory = await getSubCategoryList();
        setSubCategory(allSubCategory);
    };

    const searchOption = (event) => {
        const searchValue = event.target.value;
        setSearchItem(searchValue);
        if (searchValue.length > 0) {
            const filteredSubCategory = subCategory.filter(cat => cat.name.toLowerCase().includes(searchValue.toLowerCase()));
            setSubCategory(filteredSubCategory);
        }
        else {
            fetchSubCategoryList().then(r => true)
        }
    }

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
            name: subCatName // Replace 'New Brand' with the desired brand name
        };

        fetch('https://seba-backend.xyz/api-admin/create-subcategories/', {
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
                fetchSubCategoryList().then(r => true)
            })
            .catch(error => {
                console.error('Error creating brand:', error);
                // Handle the error
            });
    }

    useEffect(() => {
        fetchSubCategoryList().then(r => true)
    }, [])

    return (
        <>
            {toastShow ? <CustomToast message={"Successfully Added!"} /> : ""}
            <AddNewHeaderInMainBoard header6Text={"List of Sub Category"} header4Text={"Specialized List"}
                                     addingThing={"Add new sub-category"} onHandleShowForm={onHandleShowForm} />
            <div className={"row"} style={formShow ? {
                display: "block",
                marginBottom: "20px"
            } : {
                display: "none"
            }
            } id={"subCategoryFormID"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <legend>Add New</legend>
                        <div className={"row"}>
                            <div className={"col-md-10"}>
                                <input type={"text"} className={"form-control"} placeholder={"Sub Category"}
                                       value={subCatName} onChange={e => setSubCatName(e.target.value)}
                                />
                            </div>
                            <div className={"col-md-2"}>
                                <AddButton buttonName={"Add"} onHandleAddNew={onHandleAddNew} />
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
                                <div className={"col-md-4 " + brandStyle.extraWork}>
                                </div>
                            </div>
                        </div>
                        <div>
                            <input value={searchItem} onChange={searchOption}
                                   className={"form-control w-50 mb-3"} placeholder={"search "}/>
                        </div>
                        <div>
                            <div className={"card " + brandsTableStyle.cardBackground}>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">
                                        <b>All Sub-Category</b>
                                    </h5>
                                    <div className={"mt-3"}>
                                        <table className={brandsTableStyle.table}>
                                            <thead>
                                            <tr>
                                                <th scope="col">S.N.</th>
                                                <th scope="col">Specialized For</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                subCategory.length > 0 ?
                                                subCategory.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td data-label="Quantity Left">{index+1}</td>
                                                        <td data-label="Quantity Left">{item.name}</td>
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

export default SubCategoryMainBoard;
