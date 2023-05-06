import ProfileFormInputComp from "@/pages/seller/components/ProfileFormInputComp";
import {useEffect, useState} from "react";
import Link from "next/link";
import profileStyle from "@/styles/profileFormInputComp.module.css";
import {getProfileInfo} from "@/pages/api/app_data";

const SellerProfileForm = () => {
    const [nid, setNId] = useState("")
    const [photo, setPhoto] = useState(null)
    const [frontPageNId, setFrontPageNId] = useState(null)
    const [backPageNId, setBackPageNId] = useState(null)
    const [permanentAddress, setPermanentAddress] = useState("")
    const [presentAddress, setPresentAddress] = useState("")
    const [salary, setSalary] = useState("")
    const [personal_contact, setPersonalContact] = useState("")
    const [emergency_contact, setEmergencyContact] = useState("")
    const onHandlePostForm = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("access_token"));

        var formdata = new FormData();
        formdata.append("nid", nid);
        formdata.append("photo", photo);
        formdata.append("NID_front_photo", frontPageNId);
        formdata.append("NID_back_photo", backPageNId);
        formdata.append("permanent_address", permanentAddress);
        formdata.append("present_address", presentAddress);
        formdata.append("salary", "0");
        formdata.append("personal_contact", personal_contact);
        formdata.append("emergency_contact", emergency_contact);
        formdata.append("is_active", true);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-seller/salesman-profile-create/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const onFetchSellerInfo = async () => {
        const sellerProfile = await getProfileInfo();
        setNId(sellerProfile['nid']);
        setPersonalContact(sellerProfile['personal_contact'])
        setEmergencyContact(sellerProfile['emergency_contact'])
        setPermanentAddress(sellerProfile['permanent_address'])
        setPresentAddress(sellerProfile['present_address'])
    }

    useEffect(() => {
        onFetchSellerInfo().then(r => true)
    }, [])

    return (
        <>
            <div>
                {
                    nid.length > 0
                        ?
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <ProfileFormInputComp inputType={"text"}
                                                      labelText={"National Identity Number (Unchangeable)"}
                                                      placeholderText={nid}
                                                      disablePositive={true}
                                />
                            </div>
                            <div className={"col-md-4"}>
                                <ProfileFormInputComp inputType={"text"} labelText={"Personal Phone (Unchangeable)"}
                                                      placeholderText={personal_contact}
                                                      disablePositive={true}
                                />
                            </div>
                            <div className={"col-md-4"}>
                                <ProfileFormInputComp inputType={"text"} labelText={"Emergency Contact (Unchangeable)"}
                                                      placeholderText={emergency_contact}
                                                      disablePositive={true}
                                />
                            </div>
                        </div>
                        :
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <ProfileFormInputComp inputType={"text"} labelText={"National Identity Number"}
                                                      placeholderText={"Enter NId number"}
                                                      requiredPositive={true}
                                                      onInputChange={setNId}
                                />
                            </div>
                            <div className={"col-md-4"}>
                                <ProfileFormInputComp inputType={"text"} labelText={"Personal Phone"}
                                                      placeholderText={"Enter phone number"}
                                                      requiredPositive={true}
                                                      onInputChange={setPersonalContact}
                                />
                            </div>
                            <div className={"col-md-4"}>
                                <ProfileFormInputComp inputType={"text"} labelText={"Emergency Contact"}
                                                      placeholderText={"Enter phone number"}
                                                      requiredPositive={true}
                                                      onInputChange={setEmergencyContact}
                                />
                            </div>
                        </div>
                }
                {
                    permanentAddress.length > 0
                        ?
                        <div className={"row mt-3"}>
                            <div className={"col-md-6"}>
                                <ProfileFormInputComp labelText={"Permanent Address (Unchangeable)"} inputType={"text"}
                                                      placeholderText={permanentAddress}
                                                      disablePositive={true}
                                                      inputValue={permanentAddress}
                                />
                            </div>
                            <div className={"col-md-6"}>
                                <ProfileFormInputComp labelText={"Present Address"} inputType={"text"}
                                                      requiredPositive={true}
                                                      placeholderText={"Enter Address"}
                                                      onInputChange={setPresentAddress}
                                                      inputValue={presentAddress}
                                />
                            </div>
                        </div>
                        :
                        <div className={"col-md-6"}>
                            <ProfileFormInputComp labelText={"Permanent Address"} inputType={"text"}
                                                  requiredPositive={true}
                                                  placeholderText={"Enter Address"}
                                                  onInputChange={setPermanentAddress}
                            />
                        </div>
                }
                <div className={"row mt-3"}>
                    <div className={"col-md-4"}>
                        <ProfileFormInputComp labelText={"NId Front Page Photo"} placeholderText={""}
                                              requiredPositive={true} inputType={"file"}
                                              onInputChange={setFrontPageNId}
                        />
                    </div>
                    <div className={"col-md-4"}>
                        <ProfileFormInputComp labelText={"NId Back Page Photo"} placeholderText={""}
                                              requiredPositive={true} inputType={"file"}
                                              onInputChange={setBackPageNId}
                        />
                    </div>
                    <div className={"col-md-4"}>
                        <ProfileFormInputComp labelText={"Profile Picture"} inputType={"file"} placeholderText={""}
                                              requiredPositive={true}
                                              onInputChange={setPhoto}
                        />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-12">
                        <button className={"btn me-2 " + profileStyle.btnSubmit} onClick={onHandlePostForm}>
                            Submit
                        </button>
                        <button className={"btn " + profileStyle.btnCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SellerProfileForm;
