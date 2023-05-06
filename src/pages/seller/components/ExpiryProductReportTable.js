import {useEffect, useState} from "react";
import productsTableStyle from "@/styles/productTable.module.css";
import {getNearToExpiredDate} from "@/pages/api/app_data";

const ExpiryProductReportTable = () => {

    const [products, setProducts] = useState([]);

    const searchOption = () => {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.category.toLowerCase().includes(searchValue.toLowerCase()));
        setProducts(filteredProducts);
    }

    const fetchAlmostExpiryProduct = async () => {
        const prod = await getNearToExpiredDate()
        setProducts(prod)
    }

    const formatDate = (dateValue) => {
        const options = {month: 'long', day: 'numeric', year: 'numeric'};
        const date = new Date(dateValue);
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        fetchAlmostExpiryProduct().then(r => console.log(r))
    }, [])

    return (
        <>
            <div className={"card " + productsTableStyle.cardBackground}>
                <div className="card-body">
                    <h5 className="card-title mb-4">
                        <b>About to Expiry Products</b>
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
                                <th scope="col">Stock Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products ? products.map((item, index) => (
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
                                    <td data-label="Expiry Date">
                                        <b>
                                            {formatDate(item.expiry_date)}
                                        </b>
                                    </td>
                                    <td data-label="Stock Date">
                                        <b>
                                            {formatDate(item.created_at)}
                                        </b>
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

export default ExpiryProductReportTable;
