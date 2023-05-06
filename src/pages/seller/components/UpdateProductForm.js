import ProductsTable from "@/pages/seller/components/ProductsTable";
import productStyle from "@/styles/productsPage.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import ProductsTableForUpdate from "@/pages/seller/components/ProductsTableForUpdate";
import {getProductList, getShelfList} from "@/pages/api/app_data";

const UpdateProductForm = ({onHandleNotificationUpdate}) => {
    const [productId, setProductId] = useState(null)
    const [searchItem, setSearchItem] = useState("")
    const [product_name, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [alertQuantity, setAlertQuantity] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [buyingPrice, setBuyingPrice] = useState("");
    const [productExpiryDate, setProductExpiryDate] = useState("");
    const [shelfNumber, setShelfNumber] = useState("");
    const [allShelf, setAllShelf] = useState([]);
    const [all_prods, setAllProds] = useState([])
    const [tableKey, setTableKey] = useState(0);

    const onHandleSearchChange = (e) => {
        setSearchItem(e.target.value);
    }

    const onStartUpdate = (pid, n, q, aq, sp, bp, shelf) => {
        document.getElementById('updateFormCard').style.display = "block";
        setProductId(pid)
        setProductName(n)
        setQuantity(q)
        setAlertQuantity(aq)
        setSellingPrice(sp)
        setBuyingPrice(bp)
        setShelfNumber(shelf)
        setTableKey(prevKey => prevKey + 1);
    }

    const fetchData = async () => {
        const all_pro = await getProductList();
        setAllProds(all_pro);
    }

    const onHandleUpdateView = (e) => {
        e.preventDefault()

        const requestBody = {
            quantity: quantity,
            minimum_alert_quantity: alertQuantity,
            minimum_selling_price: sellingPrice,
            expiry_date: productExpiryDate.toString(),
            shelf: shelfNumber,
            bought_price: buyingPrice,
        }

        fetch(`https://seba-backend.xyz/api-product/update-product/${productId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('updateFormCard').style.display = "none";
                setTableKey(prevKey => prevKey + 1);
                onHandleNotificationUpdate()
            })
            .catch(error => console.error(error))
    }

    const fetchShelves = async () => {
        const allShelves = await getShelfList()
        setAllShelf(allShelves);
    }

    const onHandleCloseUpdateForm = (e) => {
        e.preventDefault()
        document.getElementById('updateFormCard').style.display = "none";
        setProductId("")
        setProductName("")
        setQuantity("")
        setAlertQuantity("")
        setSellingPrice("")
        setBuyingPrice("")
        setShelfNumber("")
        setProductExpiryDate("")
    }

    useEffect(() => {
        document.getElementById('updateFormCard').style.display = "none";
        fetchShelves().then(r => true)
        fetchData().then(r => true)
    }, [])

    return (
        <>
            <div className={"card "} id={"updateFormCard"}>
                <div className={"card-body"}>
                    <div>
                        <form className={"form-group"}>
                            <div className={"row"}>
                                <div className={"col-md-11"}>
                                    <legend className={"text-center"}>
                                        Update Product Information
                                        <small style={{
                                            fontSize: "13px"
                                        }}>
                                            ({product_name})
                                        </small>
                                    </legend>
                                </div>
                                <div className={"col-md-1"}>
                                    <button type={"button"} className={"btn btn-danger w-100"}
                                            onClick={e => onHandleCloseUpdateForm(e)}>
                                        <i className={"fa fa-close"}></i>
                                    </button>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>

                                        <label>Quantity</label>
                                        <input type={"number"} className={"form-control"} placeholder={"Quantity"}
                                               value={quantity}
                                               onChange={e => setQuantity(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>

                                        <label>Minimum Alert Quantity</label>
                                        <input type={"number"} className={"form-control"}
                                               placeholder={"Minimum Alert Quantity"}
                                               value={alertQuantity}
                                               onChange={e => setAlertQuantity(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>
                                        <label>Shelf Number</label>
                                        <select className={"form-control"} value={shelfNumber}
                                                onChange={e => setShelfNumber(e.target.value)}>
                                            <option>select shelf</option>
                                            {allShelf &&
                                                allShelf.map((shelf) => (
                                                    <option key={shelf.id}>
                                                        Shelf: {shelf.number} Row: {shelf.row} Column: {shelf.column}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>

                                        <label>Selling Price</label>
                                        <input type={"number"} step="0.01" className={"form-control"}
                                               placeholder={"Selling Price"}
                                               value={sellingPrice}
                                               onChange={e => setSellingPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>

                                        <label>Buying Price</label>
                                        <input type={"number"} step="0.01" className={"form-control"}
                                               placeholder={"Buying Price"}
                                               value={buyingPrice}
                                               onChange={e => setBuyingPrice(e.target.value)}/>
                                    </div>
                                </div>
                                <div className={"col-md-4 mb-2 mt-2"}>
                                    <div className={"form-group"}>
                                        <label>Expiry Date</label>
                                        <input type={"date"} step="0.01" className={"form-control"}
                                               placeholder={"Buying Price"}
                                               value={productExpiryDate}
                                               onChange={e => setProductExpiryDate(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <div className={"form-group"}>
                                        <button type={"submit"} className={"btn btn-warning text-white w-100"}
                                                onClick={onHandleUpdateView}>
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={"card mt-5"}>
                <div className={"card-body"}>
                    <div>
                        <div className={"row mb-4"}>
                            <div className={"col-md-8"}>
                                <input value={searchItem} onChange={onHandleSearchChange}
                                       className={productStyle.searchInputField} placeholder={"search "}/>
                                <button className={"btn " + productStyle.searchBtn}>
                                    <i className={"fa fa-search"}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ProductsTableForUpdate key={tableKey} searchValue={searchItem} onStartUpdate={onStartUpdate} all_prods={all_prods} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateProductForm;