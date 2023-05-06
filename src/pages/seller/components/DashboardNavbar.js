import navStyle from "../../../styles/dashboard.module.css";
import Link from "next/link";
import {useEffect, useState} from "react";
import {onHandleCartLength} from "@/pages/api/apis";
import {getAlmostExpiryProductsList, getNearToExpiredDate, getStockAlert} from "@/pages/api/app_data";
import LogoManagement from "@/pages/component/LogoManagement";

const DashboardNavbar = () => {
    const [cartLength, setCartLength] = useState(0);
    const [stockNotificationQuantity, setStockNotificationQuantity] = useState(0)
    const [expiryNotificationQuantity, setExpiryNotificationQuantity] = useState(0)
    const [userType, setUserType] = useState("")

    const findStockQuantityNotification = async () => {
        const alerts = await getStockAlert()
        setStockNotificationQuantity(alerts.length)
    }

    const findExpiryProductNotification = async () => {
        const alertQ = await getNearToExpiredDate();
        console.log(alertQ)
        setExpiryNotificationQuantity(alertQ.length)
    }

    useEffect(() => {
        onHandleCartLength().then(r => setCartLength(r.length));
        findStockQuantityNotification().then(r => true)
        findExpiryProductNotification().then(r => true)
        setUserType(localStorage.getItem('group'))
    }, [cartLength, stockNotificationQuantity])

    return (
        <>
            <nav className={"navbar navbar-expand-lg bg-white " + navStyle.bottomShadow}>
                <div className={"container-fluid " + navStyle.navContainer}>
                    <Link className="navbar-brand" href={"/"}>
                        <LogoManagement />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {userType === "seller" ?
                                <li className={"nav-item " + navStyle.navItem} title={"Cart"}>
                                    <Link className="nav-link active" aria-current="page" href={"/seller/selling-box/"}>
                                        <i className={"fa fa-shopping-cart"}>
                                            <sup className={"m-1 " + navStyle.supText}>
                                                {cartLength}
                                            </sup>
                                        </i>
                                    </Link>
                                </li>
                                : ""}
                            <li className={"nav-item " + navStyle.navItem} title={"Expiry"}>
                                <Link className="nav-link active" aria-current="page"
                                      href={"/" + userType + "/inventory-report"}>
                                    <i className={"far fa-clock"}>
                                        <sup className={"m-1 " + navStyle.supText}>
                                            {expiryNotificationQuantity}
                                        </sup>
                                    </i>
                                </Link>
                            </li>
                            <li className={"nav-item " + navStyle.navItem} title={"Stock"}>
                                <Link className="nav-link" href={"/" + userType + "/inventory-report"}>
                                    <i className={"far fa-bell"}>
                                        <sup className={"m-1 " + navStyle.supText}>
                                            {stockNotificationQuantity}
                                        </sup>
                                    </i>
                                </Link>
                            </li>
                            <li className={"nav-item " + navStyle.navItem}>
                                <Link className="nav-link" href={"/"}>
                                    {userType === "seller" ? "Seller" : "Manager"}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default DashboardNavbar;
