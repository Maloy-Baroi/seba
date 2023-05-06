import MainboardHead from "@/pages/seller/components/MainboardHead";
import brandStyle from "@/styles/BrandsPage.module.css";
import brandsTableStyle from "@/styles/brandTable.module.css";
import {getBrandList, getSellerList} from "@/pages/api/app_data";
import {useEffect, useState} from "react";
import AddNewHeaderInMainBoard from "@/pages/seller/components/AddNewHeaderInMainBoard";
import AddButton from "@/pages/manager/components/AddButton";
import CustomToast from "@/pages/manager/components/CustomToast";

const AllSellerDashboard = () => {
    const [sellerList, setSellerList] = useState([])
    const [searchItem, setSearchItem] = useState("");
    const [formShow, setFormShow] = useState(false)
    const [toastShow, setToastShow] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [otpPassword, setOtpPassword] = useState("")

    const fetchSellerList = async () => {
        const allSeller = await getSellerList();
        setSellerList(allSeller);
    };

    const searchOption = (event) => {
        const searchValue = event.target.value;
        setSearchItem(searchValue);
        if (searchValue && searchValue.length > 0) {
            const filteredSeller = sellerList.filter(cat => cat.name.toLowerCase().includes(searchValue.toLowerCase()));
            setSellerList(filteredSeller);
        }
        else {
            fetchSellerList().then(r => true)
        }
    }

    const onHandleShowForm = () => {
        setFormShow(!formShow)
    }

    const onHandleAddNew = () => {
        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", otpPassword);
        formdata.append("first_name", firstName);
        formdata.append("last_name", lastName);
        formdata.append("group_name", "seller");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-auth/user/create/", requestOptions)
            .then(response => response.text())
            .then(result =>
                {
                    showToast()
                    onHandleShowForm()
                    setEmail("")
                    setOtpPassword("")
                    setFirstName("")
                    setLastName("")
                    fetchSellerList().then(r => true)
                }
            )
            .catch(error => console.log('error', error));
    }

    function showToast() {
        setToastShow(!toastShow)
        setTimeout(() => {
            setToastShow(false);
        }, 3000);
    }

    useEffect(() => {
        fetchSellerList().then(r => true)
    }, [])

    return (
        <>
            {toastShow ? <CustomToast message={"Successfully Added!"} /> : ""}
            <AddNewHeaderInMainBoard header4Text={"Seller List"} header6Text={"List of all the salesman"}
                                     addingThing={"Seller"} onHandleShowForm={onHandleShowForm}/>
            <div className={"row"} style={formShow ? {
                display: "block",
                marginBottom: "20px"
            } : {
                display: "none"
            }
            } id={"companyFormID"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <legend>Add New</legend>
                        <div className={"row mb-4"}>
                            <div className={"col-md-6"}>
                                <input type={"email"} className={"form-control"} placeholder={"Enter Email"}
                                       value={email} onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={"col-md-6"}>
                                <input type={"text"} className={"form-control"} placeholder={"Enter Password"}
                                       value={otpPassword} onChange={e => setOtpPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={"row mb-4"}>
                            <div className={"col-md-6"}>
                                <input type={"text"} className={"form-control"} placeholder={"First Name"}
                                       value={firstName} onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className={"col-md-6"}>
                                <input type={"text"} className={"form-control"} placeholder={"Last Name"}
                                       value={lastName} onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-md-2"}>
                            </div>
                            <div className={"col-md-8"}>
                                <AddButton btnWidth={"100%"} buttonName={"Add"} onHandleAddNew={onHandleAddNew} />
                            </div>
                            <div className={"col-md-2"}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className="card" style={{width: "100%", marginLeft: "10px"}}>
                    <div className="card-body">
                        <div>
                            <div className={"row mb-4"}>
                                <div className={"col-md-8"}>

                                </div>
                                <div className={"col-md-4 " + brandStyle.extraWork}>
                                </div>
                            </div>
                        </div>
                        <div>
                            <input value={searchItem} onChange={searchOption}
                                   className={"form-control w-50 mb-3"} placeholder={"search "}/>
                        </div>
                        <div>
                            <div className={"card " + brandsTableStyle.cardBackground}>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">
                                        <b>All Salesman General Information</b>
                                    </h5>
                                    <div className={"mt-3"}>
                                        <table className={brandsTableStyle.table}>
                                            <thead>
                                            <tr>
                                                <th scope="col">S.N.</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                sellerList && sellerList.length > 0 ?
                                                sellerList.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td data-label="S.N">{index+1}</td>
                                                        <td data-label="Name">{item.first_name} {item.last_name}</td>
                                                        <td data-label="email">{item.email}</td>
                                                    </tr>
                                                ))
                                                : ""
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

export default AllSellerDashboard;
