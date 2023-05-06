import MainboardHead from "@/pages/seller/components/MainboardHead";
import { useEffect, useState } from "react";

const PurchaseReportMainBoard = () => {
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchPurchasedProduct = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-seller/purchased-products/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setPurchasedProducts(result)
            })
            .catch(error => console.log('error', error));
    }

    function formatDate(datetimeString) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const datetime = new Date(datetimeString);
        return datetime.toLocaleDateString('en-US', options);
    }

    const handleFilter = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        // Filter products based on selected date range
        const filteredProducts = purchasedProducts.filter((item) => {
            const productDate = new Date(item.updated_at); // Adjust to the actual date field in your data

            // Check if productDate falls within the selected date range
            return productDate >= startDateObj && productDate <= endDateObj;
        });

        // Set the filtered products
        console.log("filtered Item: ", filteredProducts)
        setPurchasedProducts(filteredProducts);
    };

    useEffect(() => {
        fetchPurchasedProduct().then((r) => console.log(r));
    }, []);

    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Stock Product List"} h6Text={"Manage shop products"} />
            </div>
            <div className={"row"}>
                <div className="card" style={{ width: "100%", marginLeft: "10px" }}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mt-2 mb-2">
                                <div className="form-group">
                                    <label>Start Date:</label>
                                    <input type={"date"} className={"form-control"} value={startDate} onChange={e => setStartDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6 mt-2 mb-2">
                                <div className="form-group">
                                    <label>End Date:</label>
                                    <input type={"date"} className={"form-control"} value={endDate} onChange={e => setEndDate(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <button className="bt mb-5 w-100" onClick={handleFilter} style={{
                            backgroundColor: "rgb(255, 159, 67)",
                            border: "none",
                            borderRadius: "5px",
                            height: "36px",
                            color: "#505050",
                            fontWeight: "600"
                        }}>
                            Filter
                        </button>
                        <div className="row">
                            {purchasedProducts.length > 0 ? (
                                purchasedProducts.map((item) => {
                                    const dateToShow = item.updated_at > item.created_at ? item.updated_at : item.created_at;
                                    return (
                                        <div className="col-md-4 p-3" key={item.id}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name} ({item.unit})</h5>
                                                    <p className="card-text">{item.category}</p>
                                                    <p className="card-text">Price: ৳ {item.minimum_selling_price}</p>
                                                    <button
                                                        className="btn w-100"
                                                        style={{
                                                            backgroundColor: "#FF9F43",
                                                            border: "none",
                                                            cursor: "not-allowed"
                                                        }}
                                                    >
                                                        {formatDate(dateToShow)}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No Product Found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchaseReportMainBoard;
