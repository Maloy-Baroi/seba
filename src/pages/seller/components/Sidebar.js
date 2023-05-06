import Link from "next/link";
import sidebarStyle from "@/styles/sidebar.module.css";
import LogoutButton from "@/pages/seller/components/LogoutButton";
import {useEffect, useState} from "react";
import { useToast } from "react-toastify";

const Sidebar = (props) => {
    const [userType, setUserType] = useState("");
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    const group = localStorage.getItem('group');
    if (group && group !== userType) {
      setUserType(group);
    }
    setLoading(false)
  }, [userType]);

    return (
        <>
            {
                loading ?
                (
                    <div>Loading...</div>
                )
                :
                (
                    <div id="sidebar-menu" className="sidebar-menu">
                <ul className={sidebarStyle.mainUl}>
                    <li className="submenu-open">
                        <h6 className="submenu-hdr">
                            - Main
                        </h6>
                        <ul className={sidebarStyle.sidebarNavUl}>
                            <li className={props.activeState === "dashboard" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType + "/dashboard"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-grid">
                                        <rect x="3" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="14" width="7" height="7"></rect>
                                        <rect x="3" y="14" width="7" height="7"></rect>
                                    </svg>
                                    <span>Dashboard</span></Link>
                            </li>
                            {userType==='manager' ?
                                <li className={props.activeState === "all-sellers" ? sidebarStyle.active : ""}>
                                    <Link href={"/" + userType + "/all-sellers"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-file-person" viewBox="0 0 16 16">
                                            <path
                                                d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                                            <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                        <span>All Sellers</span>
                                    </Link>
                                </li>
                                : ""}
                            <li className={"submenu " + props.activeState === "application" ? sidebarStyle.active : ""}>
                                <Link href={userType}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-smartphone">
                                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                                    </svg>
                                    <span>Application</span><span className="menu-arrow"></span></Link>
                            </li>
                        </ul>
                    </li>
                    <li className={"submenu-open "}>
                        <h6 className="submenu-hdr">- Products</h6>
                        <ul className={sidebarStyle.sidebarNavUl}>
                            <li className={props.activeState === "all_medicines" ? sidebarStyle.active : ""}>
                                <Link href={`/${userType}/medicines`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-box">
                                        <path
                                            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                    </svg>
                                    <span>Medicines</span></Link>
                                </li>
                            <li className={props.activeState === "all_products" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/products"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-box">
                                        <path
                                            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                    </svg>
                                    <span>Products</span></Link></li>
                            <li className={props.activeState === "create_products" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/create-product"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-plus-square">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="12" y1="8" x2="12" y2="16"></line>
                                        <line x1="8" y1="12" x2="16" y2="12"></line>
                                    </svg>
                                    <span>Create Product</span></Link></li>
                            <li className={props.activeState === "update_products" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/update-product"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor"
                                         className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd"
                                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                    <span>Update Product</span></Link></li>
                            <li className={props.activeState === "shelves" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/shelves"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-bookshelf" viewBox="0 0 16 16">
                                        <path
                                            d="M2.5 0a.5.5 0 0 1 .5.5V2h10V.5a.5.5 0 0 1 1 0v15a.5.5 0 0 1-1 0V15H3v.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zM3 14h10v-3H3v3zm0-4h10V7H3v3zm0-4h10V3H3v3z"/>
                                    </svg>
                                    <span>Shelf</span>
                                </Link>
                            </li>
                            <li className={props.activeState === "category" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/category"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-border-center"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M.969 0H0v.969h.5V1h.469V.969H1V.5H.969V0zm.937 1h.938V0h-.938v1zm1.875 0h.938V0H3.78v1zm1.875 0h.938V0h-.938v1zM7.531.969V1h.938V.969H8.5V.5h-.031V0H7.53v.5H7.5v.469h.031zM9.406 1h.938V0h-.938v1zm1.875 0h.938V0h-.938v1zm1.875 0h.938V0h-.938v1zm1.875 0h.469V.969h.5V0h-.969v.5H15v.469h.031V1zM1 2.844v-.938H0v.938h1zm6.5-.938v.938h1v-.938h-1zm7.5 0v.938h1v-.938h-1zM1 4.719V3.78H0v.938h1zm6.5-.938v.938h1V3.78h-1zm7.5 0v.938h1V3.78h-1zM1 6.594v-.938H0v.938h1zm6.5-.938v.938h1v-.938h-1zm7.5 0v.938h1v-.938h-1zM0 8.5v-1h16v1H0zm0 .906v.938h1v-.938H0zm7.5 0v.938h1v-.938h-1zm8.5.938v-.938h-1v.938h1zm-16 .937v.938h1v-.938H0zm7.5 0v.938h1v-.938h-1zm8.5.938v-.938h-1v.938h1zm-16 .937v.938h1v-.938H0zm7.5 0v.938h1v-.938h-1zm8.5.938v-.938h-1v.938h1zM0 16h.969v-.5H1v-.469H.969V15H.5v.031H0V16zm1.906 0h.938v-1h-.938v1zm1.875 0h.938v-1H3.78v1zm1.875 0h.938v-1h-.938v1zm1.875-.5v.5h.938v-.5H8.5v-.469h-.031V15H7.53v.031H7.5v.469h.031zm1.875.5h.938v-1h-.938v1zm1.875 0h.938v-1h-.938v1zm1.875 0h.938v-1h-.938v1zm1.875-.5v.5H16v-.969h-.5V15h-.469v.031H15v.469h.031z"/>
                                    </svg>
                                    <span>Category</span></Link>
                            </li>
                            <li className={props.activeState === "sub-category" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/sub-category"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-speaker">
                                        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                                        <circle cx="12" cy="14" r="4"></circle>
                                        <line x1="12" y1="6" x2="12.01" y2="6"></line>
                                    </svg>
                                    <span>Sub Category</span></Link>
                            </li>
                            <li className={props.activeState === "brands" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/brands"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-tag">
                                        <path
                                            d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                    </svg>
                                    <span>Brands</span></Link></li>
                            <li className={props.activeState === "import-products" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/import-products"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-minimize-2">
                                        <polyline points="4 14 10 14 10 20"></polyline>
                                        <polyline points="20 10 14 10 14 4"></polyline>
                                        <line x1="14" y1="10" x2="21" y2="3"></line>
                                        <line x1="3" y1="21" x2="10" y2="14"></line>
                                    </svg>
                                    <span>Import Products</span></Link></li>
                        </ul>
                    </li>
                    <li className="submenu-open">
                        <h6 className="submenu-hdr">- Reports</h6>
                        <ul className={sidebarStyle.sidebarNavUl}>
                            {
                                userType === 'manager'
                                    ?
                                    <li className={props.activeState === "sales-report" ? sidebarStyle.active : ""}>
                                        <Link href={"/" + userType +  "/sales-report"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round"
                                                 className="feather feather-bar-chart-2">
                                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                                <line x1="6" y1="20" x2="6" y2="14"></line>
                                            </svg>
                                            <span>Sales Report</span></Link>
                                    </li>
                                    :
                                    <li className={props.activeState === "invoice-report" ? sidebarStyle.active : ""}>
                                        <Link href={"/" + userType +  "/invoice-report"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round"
                                                 className="feather feather-file">
                                                <path
                                                    d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                                <polyline points="13 2 13 9 20 9"></polyline>
                                            </svg>
                                            <span>Invoice Report</span></Link></li>
                            }
                            <li className={props.activeState === "inventory-report" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/inventory-report"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-credit-card">
                                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                        <line x1="1" y1="10" x2="23" y2="10"></line>
                                    </svg>
                                    <span>Inventory Report</span></Link></li>
                            <li className={props.activeState === "purchase-report" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/purchase-report"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-bar-chart">
                                        <line x1="12" y1="20" x2="12" y2="10"></line>
                                        <line x1="18" y1="20" x2="18" y2="4"></line>
                                        <line x1="6" y1="20" x2="6" y2="16"></line>
                                    </svg>
                                    <span>Purchase Report</span></Link></li>
                            <li className={props.activeState === "customer-report" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/customer-report"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-pie-chart">
                                        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                    </svg>
                                    <span>Customer Report</span></Link></li>
                        </ul>
                    </li>
                    <li className="submenu-open">
                        <h6 className="submenu-hdr">- Settings</h6>
                        <ul className={sidebarStyle.sidebarNavUl}>
                            <li className={props.activeState === "settings" ? sidebarStyle.active : ""}>
                                <Link href={"/" + userType +  "/settings"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-settings">
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <path
                                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                    </svg>
                                    <span>Settings</span><span className="menu-arrow"></span></Link>
                            </li>
                            <li>
                                <LogoutButton/>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
                )
            }
        </>
    );
}

export default Sidebar;
