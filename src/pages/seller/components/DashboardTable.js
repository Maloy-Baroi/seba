import {useEffect, useState} from "react";
import mainboardStyle from "@/styles/dashboardTable.module.css";

const DashboardTable = () => {
    let [products, setProducts] = useState([]);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-product/expired-products/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setProducts(result)
            })
            .catch(error => console.log('error', error));
    }, [])

    return (
        <div className={"card " + mainboardStyle.cardBackground}>
            <div className="card-body">
                <h5 className="card-title mb-4">
                    <b>Expired Products</b>
                </h5>
                <div className={"mt-3"}>
                    <table className={mainboardStyle.table}>
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity Left</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Location</th>
                            <th scope="col">Expired</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.length > 0 ? 
                            products.map((item, index) => (
                                <tr key={index}>
                                    <td data-label="Name">{item.name}</td>
                                    <td data-label="Quantity Left">{item.quantity}</td>
                                    <td data-label="Brand">{item.brand}</td>
                                    <td data-label="Brand">
                                        Shelf: {item.shelf.split(", ")[0]} <br/>
                                        Row: {item.shelf.split(", ")[1]} <br/>
                                        Column: {item.shelf.split(", ")[2]}
                                    </td>
                                    <td data-label="Expired">{item.expiry_date}</td>
                                </tr>
                            ))
                            : <tr></tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashboardTable;
