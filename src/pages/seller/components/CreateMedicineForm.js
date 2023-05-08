import {useEffect, useState} from "react";
import {
    getProductList,
    getAlmostExpiryProductsList,
    getExpiredProductsList,
    getCategoryList,
    getSubCategoryList,
    getBrandList, getShelfList, getConsumptionTypeList, getMedicineInfoList
} from "@/pages/api/app_data"
import productFormStyle from "@/styles/productForm.module.css";
import {useRouter} from "next/router";
import fetch from "isomorphic-unfetch";

const CreateMedicineForm = () => {
    const [p_name, setPName] = useState("")
    const [p_type, setPType] = useState("")
    const [strength, setStrength] = useState("")
    const [allConsumptionType, setAllConsumptionType] = useState([])
    const [purchased_quantity, setPurchasedQuantity] = useState(1)
    const [minimumQuantity, setMinimumQuantity] = useState(1)
    const [minimumPrice, setMinimumPrice] = useState(1)
    const [buyingPrice, setBuyingPrice] = useState(1)
    const [expiry_date, setExpiryDate] = useState('')
    const [shelfNumber, setShelfNumber] = useState("")
    const [description_, setDescription] = useState("")
    const [status, setStatus] = useState(true)
    const [categories, setCategories] = useState([])
    const [productNames, setProductNames] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [allBrand, setBrand] = useState([])
    const [allShelf, setAllShelf] = useState([])
    const [filteredProductName, setFilteredProductName] = useState([])
    const [categorySearchText, setCategorySearchText] = useState("");
    const [subCategorySearchText, setSubCategorySearchText] = useState("");
    const [brandSearchText, setBrandSearchText] = useState("");
    const [imported, setImported] = useState(false)
    const [importer, setImporter] = useState("")

    const navigator = useRouter()

    const fetchSubCategories = async () => {
        const allSubCategories = await getSubCategoryList();
        setSubCategories(allSubCategories);
    };

    const fetchShelves = async () => {
        const allShelves = await getShelfList()
        setAllShelf(allShelves);
    }

    const fetchConsumptionType = async () => {
        const allTypeOfConsumption = await getConsumptionTypeList();
        setAllConsumptionType(allTypeOfConsumption);
    };

    const searchProduct = async (inputVal) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('access_token')}`);

        var formdata = new FormData();
        formdata.append("medicine_name", inputVal);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-product/medicines-info/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setFilteredProductName(result);
                fetchSubCategories().then(r => true);
                fetchShelves().then(r => true);
                fetchConsumptionType().then(r => true)
            })
            .catch(error => console.log('error', error));
    }

    const filteredSubCategories = subCategories.length > 0 ? subCategories.filter((category) => {
        return category.name.toLowerCase().startsWith(subCategorySearchText.toLowerCase());
    }) : [];


    const handleProductNameInputChange = (event) => {
        let prodName = document.getElementById("productNamesID")
        prodName.style.display = "block";
        let inputVal = event.target.value;
        setPName(inputVal)
        if (inputVal.length > 2) {
            searchProduct(inputVal).then(r => true);
            let specialisedForID = document.getElementById("specialisedForID")
            p_name.length > 1 ? specialisedForID.style.display = "block" : specialisedForID.style.display = "none"

        }
    }

    const handleProductNameSelect = (productName, productStrength, productType, productGen, productCom) => {
        setPName(productName);
        setStrength(productStrength);
        setPType(productType);
        setCategorySearchText(productGen);
        setBrandSearchText(productCom);
        let prodName = document.getElementById("productNamesID")
        prodName.style.display = "none";
    }

    const handleCategoryInputChange = (event) => {
        setCategorySearchText(event.target.value);
    }

    const handleSubCategoryInputChange = (event) => {
        let specialisedForID = document.getElementById("specialisedForID");
        specialisedForID.style.display = "block";
        setSubCategorySearchText(event.target.value);
    }

    const handleSubCategorySelect = (sub_categoryName) => {
        setSubCategorySearchText(sub_categoryName);
        let specialisedForID = document.getElementById("specialisedForID")
        specialisedForID.style.display = "none";
    }

    const handleBrandInputChange = (event) => {
        setBrandSearchText(event.target.value);
    }

    const onHandleSubmitForm = (e) => {
        e.preventDefault()
        // const formData = new FormData(e.target)
        const requestBody = {
            barcode_id: 1001,
            name: p_name,
            type: p_type,
            unit: strength,
            quantity: purchased_quantity,
            minimum_alert_quantity: minimumQuantity,
            minimum_selling_price: minimumPrice,
            expiry_date: expiry_date.toString(),
            shelf: shelfNumber,
            status: status,
            category: categorySearchText,
            sub_category: subCategorySearchText,
            brand: brandSearchText,
            bought_price: buyingPrice,
            description: description_ ? description_ : "No details",
            is_medicine: true
        }

        if (imported) {
            requestBody.importer = importer;
            requestBody.imported = true;
        }

        fetch('https://seba-backend.xyz/api-product/products-list/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data =>
                // eslint-disable-next-line react-hooks/exhaustive-deps
                navigator.push('/seller/medicines')
            )
            .catch(error => console.error(error))
    }

    return (
        <>
            <ul>
                {
                    productNames && productNames.map(item => (
                        <li>{item.product_name}</li>
                    ))
                }
            </ul>
            <div className="card">
                <div className="card-body">
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <legend>
                                Add Medicine
                            </legend>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Medicine Name*</label>
                                <input type={"text"} className={"form-control"}
                                       value={
                                           p_name ?
                                               p_name :
                                               ""
                                       }
                                       onChange={handleProductNameInputChange} placeholder={"Medicine Name"}/>
                                <ul id={"productNamesID"} style={
                                    p_name.length > 0 ?
                                        {display: "block", height: "200px", overflow: "scroll"} :
                                        {display: "none"}
                                }
                                >
                                    {
                                        filteredProductName && filteredProductName.length > 0 ?
                                            filteredProductName.map((prodName) => (
                                                <li key={prodName.id}
                                                    onClick={() => handleProductNameSelect(prodName.product_name, prodName.strength, prodName.type, prodName.generics, prodName.company)}
                                                    style={{
                                                        cursor: "pointer"
                                                    }}>
                                                    {prodName.product_name} ({prodName.strength})
                                                </li>
                                            ))
                                            : ""
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Generic Name*</label>
                                <input type={"text"} className={"form-control"} value={categorySearchText}
                                       onChange={handleCategoryInputChange} placeholder={"Generic Name"}/>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Medicine For*</label>
                                <input type={"text"} className={"form-control"} value={subCategorySearchText}
                                       onChange={handleSubCategoryInputChange} placeholder={"Specialised"}/>
                                <ul id={"specialisedForID"} style={
                                    subCategorySearchText.length > 0 ?
                                        {display: "block", height: "200px", overflowY: "auto", overflowX: "hidden"} :
                                        {display: "none"}
                                }
                                >
                                    {
                                        filteredSubCategories && filteredSubCategories.length > 0 ?
                                            filteredSubCategories.map((sub_category) => (
                                                <li key={sub_category.id}
                                                    onClick={() => handleSubCategorySelect(sub_category.name)} style={{
                                                    cursor: "pointer"
                                                }}>
                                                    {sub_category.name}
                                                </li>
                                            ))
                                            : ""
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Brand Name*</label>
                                <input type={"text"} className={"form-control"} value={brandSearchText}
                                       onChange={handleBrandInputChange} placeholder={"Brand"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Type*</label>
                                <select className={"form-control"} placeholder={"table/capsule"} value={p_type}
                                        onChange={e => {
                                            setPType(e.target.value)
                                        }
                                        }>
                                    <option>Select type (capsule/table)</option>
                                    {
                                        allConsumptionType && allConsumptionType.length > 0 ?
                                            allConsumptionType.map((item, index) => {
                                                return (
                                                    <option key={index}>{item.type_name}</option>
                                                )
                                            })
                                            : ""
                                    }
                                </select>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Strength*</label>
                                <input type={"text"} className={"form-control"} placeholder={"example: 250mg / 500mg"}
                                       value={strength} onChange={e => setStrength(e.target.value)}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Quantity*</label>
                                <input type={"number"} className={"form-control"} placeholder={"Quantity"}
                                       value={purchased_quantity.toString()}
                                       onChange={e => setPurchasedQuantity(parseInt(e.target.value))}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Minimum Alert Qty*</label>
                                <input type={"number"} className={"form-control"} placeholder={"Minimum Qty"}
                                       value={minimumQuantity.toString()}
                                       onChange={e => setMinimumQuantity(parseInt(e.target.value))}/>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Minimum Selling Price*</label>
                                <input type={"number"} className={"form-control"} placeholder={"Price"} min={"0.25"}
                                       step={"0.01"}
                                       value={minimumPrice.toString()}
                                       onChange={e => setMinimumPrice(parseFloat(e.target.value))}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Buying Price*</label>
                                <input type={"number"} className={"form-control"} placeholder={"Price"} min={"0.25"}
                                       step={"0.01"}
                                       value={buyingPrice.toString()}
                                       onChange={e => setBuyingPrice(parseFloat(e.target.value))}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Expiry Date*</label>
                                <input type="date" className={"form-control"} value={expiry_date}
                                       onChange={(event) => setExpiryDate(event.target.value)}/>

                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Shelf*</label>
                                <select className={"form-control"} value={shelfNumber}
                                        onChange={e => setShelfNumber(e.target.value)}>
                                    <option>select shelf</option>
                                    {
                                        allShelf.length > 0 ?
                                            allShelf.map((shelf) => (
                                                <option key={shelf.id}>
                                                    Shelf: {shelf.number} Row: {shelf.row} Column: {shelf.column}
                                                </option>
                                            ))
                                            : ""
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-12 col-md-12 col-sm-12"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Description</label>
                                <textarea className={"form-control"} value={description_}
                                          onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-md-6">
                            <input type="checkbox" value={imported} onClick={e => setImported(!imported)}/>
                            <label>&nbsp; Imported?</label>
                        </div>
                        <div className="col-md-6">
                            {imported && (
                                <div className={"form-group " + productFormStyle.formGroup}>
                                    <label>Importer</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={importer}
                                        onChange={(event) => setImporter(event.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <button className={"btn me-2 " + productFormStyle.btnSubmit}
                                    onClick={onHandleSubmitForm}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateMedicineForm;
