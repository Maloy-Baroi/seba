import OnlyHead from "@/pages/seller/components/OnlyHead";
import DashboardNavbar from "@/pages/seller/components/DashboardNavbar";
import dashboardStyle from "@/styles/dashboard.module.css";
import Sidebar from "@/pages/seller/components/Sidebar";
import SellingBoxMainBoard from "@/pages/seller/components/SellingBoxMainBoard";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import Swal from "sweetalert2"

const SellingBox = () => {
    const [boxProduct, setBoxProduct] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [boxProductChanged, setBoxProductChanged] = useState(false); // Add state variable to track changes
    const navigator = useRouter()

    const addToBox = (id, quantity) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

        var formdata = new FormData();
        formdata.append("product_id", id);
        formdata.append("quantity", quantity);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-seller/cart/", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    const takeCartData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-seller/cart-list/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setBoxProduct(result)
            })
            .catch(error => console.log('error', error));
    }

    const onHandleWrittenQuantity = (itemId, quantity, itemQuantity) => {
        if (itemQuantity) {
            addToBox(itemId, quantity - itemQuantity);
        } else {
            addToBox(itemId, quantity);
        }
        takeCartData();
        setBoxProductChanged(true);
    };


    const handleSellSubmission = async (customerName, customerPhn, payment_method) => {
        // e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

        var formdata = new FormData();
        formdata.append("baler_customer", customerName);
        formdata.append("phone", customerPhn);
        formdata.append("payment_method", payment_method);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-seller/order/", requestOptions)
            .then(response => response.json())
            .then(result => {
                Swal.fire(
                    'Good job!',
                    'Successfully ordered!',
                    'success'
                )
                navigator.push('seller/invoice-report')
            })
            .catch(error => console.log('error', error));
    }

    const deleteItem = (cartId) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

        var formdata = new FormData();
        formdata.append("cartId", cartId);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-seller/cart-delete/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        takeCartData();
        setBoxProductChanged(true);
    }

    useEffect(() => {
        takeCartData();
        if (boxProductChanged) {
            setBoxProductChanged(false); // Reset the state variable after re-rendering
        }
    }, [boxProductChanged])

    return (
        <>
            <OnlyHead page={"Selling Box"}/>
            <main>
                <DashboardNavbar />
                <div className={"row w-100"}>
                    <div className={"col-md-2 " + dashboardStyle.sidebarContainer}>
                        <Sidebar/>
                    </div>
                    <div className={"col-md-10"} style={{
                        backgroundColor: "#f8f8f8"
                    }}>
                        <div className={dashboardStyle.content}>
                            <SellingBoxMainBoard boxItems={boxProduct}
                                                 handleSellSubmission={handleSellSubmission}
                                                 deleteItem={deleteItem}
                                                 onHandleWrittenQuantity={onHandleWrittenQuantity}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default SellingBox;
