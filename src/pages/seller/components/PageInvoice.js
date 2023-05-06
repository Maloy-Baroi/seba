import React, {useEffect, useState} from 'react';
import styles from '@/styles/invoice.module.css';
import {useRouter} from "next/router";
import Image from "next/image";

const PageInvoice = () => {

    const navigator = useRouter()

    const [order, setOrder] = useState([])
    const [items, setItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const {order_id} = navigator.query

    const onHandlePrint = () => {
        console.log(order_id)
        fetch(`http://127.0.0.1:8000/api-seller/single-order-view/${order_id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setOrder(data)
                setItems(data.items)
                const totalPrice = data.items.reduce(
                    (acc, item) => acc + parseFloat(item.get_total),
                    0
                );
                setTotalPrice(totalPrice);
            })
            .catch((error) => console.log("error", error));
    }

    const formattedDate = order.created_at
        ? new Date(order.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        : '';

    useEffect(() => {
        if (order_id) {
            onHandlePrint();
        }
    })

    const onHandleSave = () => {
        print()
        window.onafterprint = () => {
            navigator.push('seller/products')
        };
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            const saveBtn = document.getElementById('printBtn')
            if (saveBtn) {
                saveBtn.click()
            }
        }, 500)
    }, [])

    function formatDateTime(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formatter = new Intl.DateTimeFormat('en', options);
        const formattedDateTime = formatter.format(date);
        return `${formattedDateTime}`;
    }

    return (
        <>
            <div className={styles.invoiceBody}>
                <div className={styles.invoiceContainer}>
                    <small style={{fontSize: "8px", textAlign: "center"}}>
                        Invoice - {formatDateTime(new Date())}
                    </small>
                    <div className={styles.ticket}>
                        <h4>Seba Pharmacy</h4>
                        <p className={styles.centered}>Invoice Details <br/>Address line 1<br/>Address line 2</p>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th className={styles.quantity}>Q.</th>
                                <th className={styles.description}>Product</th>
                                <th className={styles.price}> ৳৳</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items ?
                                items.map(item => (
                                    <tr key={item.id}>
                                        <td className={styles.quantity}>{item.quantity}</td>
                                        <td className={styles.description}>
                                            {item.get_product_name} {item.get_product_strength}
                                        </td>
                                        <td className={styles.price}> ৳ {item.get_total}</td>
                                    </tr>
                                ))
                                : "No data found!!!"}
                            </tbody>
                        </table>
                        <hr/>
                        <div className={"row"}>
                            <div className={"col-md-4"}>

                            </div>
                            <div className={"col-md-4"}></div>
                            <div className={"col-md-4"}>
                                <p>
                                    Total: <span>৳ {totalPrice} &nbsp;</span>
                                    (<span>{
                                        order.payment_method==="On Credit" ?
                                            "Due"
                                            : "Paid"
                                    }</span>)
                                </p>
                            </div>
                        </div>
                        <p className={styles.centered}>Thanks for your purchase!<br/>Powered By: semsoftltd.com</p>
                    </div>

                    <button type={"button"} id={"printBtn"} style={{display: "none"}}
                            onClick={() => onHandleSave()}></button>
                </div>
            </div>
        </>
    );
};

export default PageInvoice;
