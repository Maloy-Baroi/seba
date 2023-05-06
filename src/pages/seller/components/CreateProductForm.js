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

const CreateProductForm = () => {
    const [barcode, setBarcode] = useState("")
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
    const [subCategories, setSubCategories] = useState([])
    const [allBrand, setBrand] = useState([])
    const [allShelf, setAllShelf] = useState([])
    const [categorySearchText, setCategorySearchText] = useState("");
    const [subCategorySearchText, setSubCategorySearchText] = useState("");
    const [brandSearchText, setBrandSearchText] = useState("");
    const [imported, setImported] = useState(false)
    const [importer, setImporter] = useState("")

    const navigator = useRouter()

    useEffect(() => {
        const fetchShelves = async () => {
            const allShelves = await getShelfList()
            setAllShelf(allShelves);
        }

        fetchShelves().then(r => true)
    }, []);

    const onHandleSubmitForm = (e) => {
        e.preventDefault()
        // const formData = new FormData(e.target)
        const requestBody = {
            barcode_id: barcode,
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
            is_medicine: false
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
                navigator.push('seller/products')
            )
            .catch(error => console.error(error))
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <legend>
                                Add Product
                            </legend>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Product Barcode
                                    <span className={"text-danger"}> *</span>
                                </label>
                                <input type={"text"} className={"form-control"}
                                       value={barcode}
                                       onChange={e => setBarcode(e.target.value)} placeholder={"Product Barcode"}/>
                            </div>
                        </div>
                        <div className={"col-md-1"}></div>
                        <div className={"col-md-4"} style={{
                            marginTop: "40px"
                        }}>
                            <input type="checkbox" value={imported} onClick={e => setImported(!imported)}
                                style={{
                                    width: "50px"
                                }}
                            />
                            <label>&nbsp; Imported?</label>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"row"}>
                                <div className="col-md-12">
                                    {imported && (
                                        <div className={"form-group " + productFormStyle.formGroup}>
                                            <label>Importer</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={importer}
                                                placeholder={"Importer Company Name"}
                                                onChange={(event) => setImporter(event.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-1"}></div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Product Name*</label>
                                <input type={"text"} className={"form-control"}
                                       value={p_name}
                                       onChange={e => setPName(e.target.value)} placeholder={"Product Name"}/>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Category Name *</label>
                                <input type={"text"} className={"form-control"} value={categorySearchText}
                                       onChange={e => setCategorySearchText(e.target.value)} placeholder={"Cosmetics/Food"}/>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>For *</label>
                                <input type={"text"} className={"form-control"} value={subCategorySearchText}
                                       onChange={e => setSubCategorySearchText(e.target.value)} placeholder={"Men/Women/Baby"}/>
                            </div>
                        </div>
                        <div className={"col-md-3"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Brand Name *</label>
                                <input type={"text"} className={"form-control"} value={brandSearchText}
                                       onChange={e => setBrandSearchText(e.target.value)} placeholder={"Brand"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Type *</label>
                                <input type={"text"} className={"form-control"} value={p_type}
                                       onChange={e => setPType(e.target.value)} placeholder={"Consumption type"}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Weight *</label>
                                <input type={"text"} className={"form-control"} placeholder={"Example: 250g/250ml"}
                                       value={strength} onChange={e => setStrength(e.target.value)}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Quantity *</label>
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
                                <label>Minimum Selling Price *</label>
                                <input type={"number"} className={"form-control"} placeholder={"Price"} min={"0.25"}
                                       step={"0.01"}
                                       value={minimumPrice.toString()}
                                       onChange={e => setMinimumPrice(parseFloat(e.target.value))}/>
                            </div>
                        </div>
                        <div className={"col-lg-3 col-md-3 col-sm-6"}>
                            <div className={"form-group " + productFormStyle.formGroup}>
                                <label>Buying Price *</label>
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
                                        allShelf && allShelf.length > 0?
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

export default CreateProductForm;
