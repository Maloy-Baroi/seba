import MainboardHead from "@/pages/seller/components/MainboardHead";
import {useEffect, useState} from "react";
import sellingBoxStyle from "@/styles/sellBox.module.css"
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

const SellingBoxMainBoard = ({boxItems, handleSellSubmission, deleteItem, onHandleWrittenQuantity}) => {
    const [customerName, setCustomerName] = useState("")
    const [customerPhn, setCustomerPhn] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [customerProfiles, setCustomerProfiles] = useState([])

    const getTotalPrice = () => {
        let total = 0;
        boxItems ? boxItems.length > 0 ? 
        boxItems.map((item) => {
            total += item.get_total;
        })
    : total=0 : "" ;
        return total.toFixed(2);
    }

    const customerListFetch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-seller/customer-profiles/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCustomerProfiles(result)
            })
            .catch(error => console.log('error', error));
    }

    const CustomerFilter = (searchValue) => {
        const filteredProducts = customerProfiles.filter(profile => profile.name.toLowerCase().includes(searchValue.toLowerCase()));
        setCustomerProfiles(filteredProducts);
    }

    useEffect(() => {
        customerListFetch()
        getTotalPrice()
    }, [])

    return (
        <>
            <div className={"row"}>
                <MainboardHead h4Text={"Selling Box"} h6Text={"List of Products in Selling Box"}/>
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <div className={"row mb-4"}>
                                <div className={"col-md-8"}>

                                </div>
                            </div>
                        </div>
                        <div>
                            {/*    Here is the Selling Box */}
                            <div>
                                <div className={"row"} style={{
                                    backgroundColor: "rgba(254, 159, 67, 0.08)",
                                    textAlign: "center",
                                    paddingTop: "10px",
                                    color: "#FF9F43"
                                }}>
                                    <div className={"col-md-3"}>
                                        <div className={"row"}>
                                            <div className={"col-md-2"}>
                                            </div>
                                            <div className={"col-md-10"}>
                                                <p>
                                                    Name
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col-md-3"}>
                                        <p>
                                            Strength
                                        </p>
                                    </div>
                                    <div className={"col-md-3"}>
                                        <p>
                                            Quantity
                                        </p>
                                    </div>
                                    <div className={"col-md-3"}>
                                        <p>
                                            Quantity x Unit Price
                                        </p>
                                    </div>
                                </div>
                                <hr/>
                                {
                                    boxItems && boxItems.length > 0 ?
                                    boxItems.map((item) => (
                                        <div key={item.id}>
                                            <div className={"row text-center mb-2 mt-2 " + sellingBoxStyle.tabRow}>
                                                <div className={"col-md-3"}>
                                                    <div className={"row"}>
                                                        <div className={"col-md-2"}>
                                                            <button className={"btn btn-danger"}
                                                                    onClick={() => deleteItem(item.id)}>
                                                                <i className={"fa fa-close"}></i>
                                                            </button>
                                                        </div>
                                                        <div className={"col-md-10"}>
                                                            <h5>{item.get_product_name}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"col-md-3"}>
                                                    <h5>{item.get_product_strength}</h5>
                                                </div>
                                                <div className={"col-md-3"}>
                                                    <h5 style={{
                                                        display: "inline-flex",
                                                        justifyContent: "center"
                                                    }}>
                                                        <input type={"number"} min={"1"} className={'form-control w-50'}
                                                               value={item.quantity}
                                                               onChange={e => onHandleWrittenQuantity(item.product, e.target.value, item.quantity)}
                                                        />
                                                    </h5>
                                                </div>
                                                <div className={"col-md-3"}>
                                                    <h5>
                                                        &#2547; {item.get_total}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form className={"form-group mt-3 mb-3"}>
                <legend>Customer Details</legend>
                <div className={"row"}>
                    <div className={"col-md-4"}>
                        <input className={"form-control"} placeholder={"Customer Name"} value={customerName}
                               onChange={e => setCustomerName(e.target.value)}/>
                    </div>
                    <div className={"col-md-4"}>
                        <input className={"form-control"} placeholder={"Customer Phone"} value={customerPhn}
                               onChange={e => setCustomerPhn(e.target.value)}/>
                    </div>
                    <div className={"col-md-4"}>
                        <select className={"form-control"} value={paymentMethod}
                                onChange={e => setPaymentMethod(e.target.value)}>
                            <option>Select Payment Method</option>
                            <option>Cash</option>
                            <option>Bkash</option>
                            <option>Nagad</option>
                            <option>Rocket</option>
                            <option>Upay</option>
                            <option>Debit Card</option>
                            <option>Credit Card</option>
                            <option>On Credit</option>
                        </select>
                    </div>
                </div>
            </form>
            <div className={"row"}>
                <div className={"col-md-4"}>
                    <div className={"mt-4"}>
                        {customerName && customerPhn && boxItems && boxItems.length > 0 ?
                            <button className={"btn btn-danger btn-md w-75"}
                                    onClick={() => handleSellSubmission(customerName, customerPhn, paymentMethod)}>
                                Sell
                            </button>
                            :
                            <button className={"btn btn-danger btn-md w-75"} disabled={true}>
                                Sell
                            </button>
                        }
                    </div>
                </div>
                <div className={"col-md-4"}></div>
                <div className={"col-md-4"}>
                    <div className={"row mt-4 " + sellingBoxStyle.totalContainer}>
                        <div className={"col-md-6"}>
                            <p>
                                Total Price:
                            </p>
                        </div>
                        <div className={"col-md-6"}>
                            <div>
                                <p>
                                    <span>
                                        <b>&#2547;</b> &nbsp;
                                    </span>
                                    <span>
                                        {getTotalPrice()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SellingBoxMainBoard
