import MainboardHead from "@/pages/seller/components/MainboardHead";
import productStyle from "@/styles/productsPage.module.css";
import customerTableStyle from "@/styles/customerTable.module.css";
import {getCategoryList, getCustomerReport} from "@/pages/api/app_data";
import {useEffect, useState} from "react";

const CustomerReportMainBoard = () => {
    const [allCustomers, setAllCustomers] = useState([])
    const [searchItem, setSearchItem] = useState("");

    const fetchCustomers = async () => {
        const allCustomersReport = await getCustomerReport();
        setAllCustomers(allCustomersReport);
    };

    const searchOption = (event) => {
        const searchValue = event.target.value;
        setSearchItem(searchValue);
        if (searchValue.length > 0) {
            const filteredCustomers = allCustomers.filter(cast => cast.name.toLowerCase().includes(searchValue.toLowerCase()));
            setAllCustomers(filteredCustomers);
        }
        else {
            fetchCustomers().then(r => true)
        }
    }

    useEffect(() => {
        fetchCustomers().then(r => true)
    }, [])


    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Customer List"} h6Text={"List of Customers & Star Customers"}/>
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
                            <div className={"card " + customerTableStyle.cardBackground}>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">
                                        <b>All Customers</b>
                                    </h5>
                                    <div className={"mt-3"}>
                                        <table className={customerTableStyle.table}>
                                            <thead>
                                            <tr>
                                                <th scope="col">S.N.</th>
                                                <th scope="col">Customer Name</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope={"col"}>Total Purchased</th>
                                                <th scope={"col"}>Total Purchased Amount</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                allCustomers.length > 0 ?
                                                allCustomers.map((customer, index) => (
                                                    <tr key={index} style={{
                                                        textAlign: "center"
                                                    }}>
                                                        <td data-label="S.N.">{index + 1}</td>
                                                        <td data-label="Name">
                                                            {index < 3 ?
                                                                <i className={"fa fa-star"} style={{
                                                                    color: "#FF9F43"
                                                                }}></i>
                                                                : ""}
                                                            &nbsp; {customer.name}
                                                        </td>
                                                        <td data-label="Phone Number">{customer.phone_number}</td>
                                                        <td data-label={"Total Purchased"}>{customer.get_total_order}</td>
                                                        <td data-label={"Total Purchased"}>{customer.get_total_price}</td>
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

export default CustomerReportMainBoard
