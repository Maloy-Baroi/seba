import {useEffect, useState} from "react";
import productsTableStyle from "@/styles/productTable.module.css";

const ProductsTableForUpdate = ({searchValue, onStartUpdate, changeKey}) => {
    const [products, setProducts] = useState([]);
    const [reloadTable, setReloadTable] = useState(changeKey);

    const searchOption = () => {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.category.toLowerCase().includes(searchValue.toLowerCase()));
        setProducts(filteredProducts);
    }

    useEffect(() => {
        if (searchValue) {
            searchOption()
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://seba-backend.xyz/api-product/all-products-list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setProducts(result)
                })
                .catch(error => console.log('error', error));
        }
    }, [reloadTable])

    const onHandle = (id) => {
        onHandleUpdate()
    }

    return (
        <>
            <div className={"card " + productsTableStyle.cardBackground}>
                <div className="card-body">
                    <h5 className="card-title mb-4">
                        <b>All Products</b>
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
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.length>0 ?
                                products.map((item, index) => (
                                    <tr key={item.id}>
                                        <td data-label="Name">
                                            <p className={productsTableStyle.itemName}>{item.name} </p>
                                            <p>({item.unit})</p>
                                            <p className={productsTableStyle.brandName}>({item.brand})</p>
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
                                        <td data-label="Action">
                                            <div>
                                                <button className={productsTableStyle.AddToSellBtn}
                                                        onClick={() => onStartUpdate(item.id, item.name, item.quantity, item.minimum_alert_quantity, item.minimum_selling_price, item.bought_price, item.status)}>Update
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                : <tr></tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductsTableForUpdate;
