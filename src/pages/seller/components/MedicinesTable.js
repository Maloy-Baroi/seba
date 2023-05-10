import productsTableStyle from "@/styles/productTable.module.css";
import {useState, useEffect} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getCategoryList, getMedicineList, getProductList, getProductList2} from "@/pages/api/app_data";


const MedicinesTable = (props) => {
    const [products, setProducts] = useState([]);
    const [userType, setUserType] = useState("")

    const searchOption = () => {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(props.searchValue.toLowerCase()) || product.category.toLowerCase().includes(props.searchValue.toLowerCase()));
        setProducts(filteredProducts);
    }

    const fetchMedicines = async () => {
        let all_prod2 = await getMedicineList2(1);
        setProducts(all_prod2.results);
        console.log(all_prod2);
        let next_page_number = all_prod2.next.slice(-1);
        while (all_prod2.next !== null) {
            next_page_number = all_prod2.next.slice(-1);
            all_prod2 = await getProductList2(next_page_number);
            const newProducts = all_prod2.results.filter(
                (product) => !products.find((p) => parseInt(p.id) === parseInt(product.id))
            );
            setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        }
    }

    useEffect(() => {
        if (props.searchValue) {
            searchOption()
        } else {
            fetchMedicines().then(r => console.log(r))
            setUserType(localStorage.getItem('group'))
        }
    }, [props.searchValue])

    const onHandleAddToBox = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

        var formdata = new FormData();
        formdata.append("product_id", id);
        formdata.append("quantity", "1");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-seller/cart/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result['message'])
                const updatedItems = products ? products.map((item) => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1};
                    } else {
                        return item
                    }
                }) : "";
                props.recallDashboard();
                setProducts(updatedItems);
                toast.success('Product added', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000, // Close the toast after 3 seconds
                    hideProgressBar: true, // Hide the progress bar
                });
            })
            .catch(error => console.log('error', error));

    }

    return (
        <>
            <div className={"card " + productsTableStyle.cardBackground}>
                <div className="card-body">
                    <h5 className="card-title mb-4">
                        <b>All Medicines</b>
                    </h5>
                    <div className={"mt-3"}>
                        <table className={productsTableStyle.table}>
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Generic</th>
                                <th scope="col">Quantity Left</th>
                                <th scope="col">Shelf</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">Price</th>
                                {userType === "seller" ?
                                    <th scope="col">Sell</th>
                                    : <th></th>}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.length > 0 ?
                                    products.map((item, index) => (
                                        <tr key={item.id}>
                                            <td data-label="Name">
                                                <p className={productsTableStyle.itemName}>{item.name} </p>
                                                <p>({item.unit})</p>
                                                <p className={productsTableStyle.brandName}>
                                                    ({item.brand})
                                                </p>
                                            </td>
                                            <td data-label="Generic" style={{
                                                width: "148px",
                                                whiteSpace: "pre-wrap",
                                            }}>
                                                {item.category}
                                            </td>
                                            <td data-label="Quantity Left">{item.quantity}</td>
                                            <td data-label="Brand">
                                                Shelf: {item.shelf.split(", ")[0]} <br/>
                                                Row: {item.shelf.split(", ")[1]} <br/>
                                                Column: {item.shelf.split(", ")[2]}
                                            </td>
                                            <td data-label="Expiry Date">{item.expiry_date}</td>
                                            <td data-label="Price">
                                                <b>
                                                    &#2547; {item.minimum_selling_price}
                                                </b>
                                            </td>
                                            {userType === "seller" ?
                                                <td data-label="Sell">
                                                    <div>
                                                        <button className={productsTableStyle.AddToSellBtn}
                                                                onClick={() => onHandleAddToBox(item.id)}>Add to Sell
                                                        </button>
                                                    </div>
                                                </td>
                                                : <td></td>
                                            }
                                        </tr>
                                    ))
                                    : <tr></tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

export default MedicinesTable;
