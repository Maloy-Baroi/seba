import React, {useState} from "react";
import signupStyle from "@/styles/signup.module.css"
import CustomToast from "./manager/components/CustomToast";

export default function singupManager() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [firstName, setFirstName] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [lastName, setLastName] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [repeatPassword, setRepeatPassword] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [inputType, setInputType] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted!");
        console.log(email, password, repeatPassword);
        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("first_name", firstName);
        formdata.append("last_name", lastName);
        formdata.append("group_name", "manager");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-auth/user/create/", requestOptions)
            .then(response => response.text())
            .then(result => {
                <CustomToast message={"Successfully Registered"}/>
            })
            .catch(error => console.log('error', error));
    };

    const onHandleSeePassword = (event) => {
        event.preventDefault()
        setInputType(prev => !prev)
    }

    return (
        <>
            <div className={"row"}>
                <div className={"col-md-2"}></div>
                <div className={"col-md-8"}>
                    <div className={signupStyle.formContainer}>
                        <form onSubmit={handleSubmit}>
                            <legend className={signupStyle.legend}>Add A New Manager</legend>
                            <div className={"form-group"}>
                                <input className={"form-control " + signupStyle.input} placeholder="Enter Email"
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className={"form-group"}>
                                <input className={"form-control " + signupStyle.input} placeholder="Enter First Name"
                                       value={firstName}
                                       onChange={e => setFirstName(e.target.value)}/>
                            </div>
                            <div className={"form-group"}>
                                <input className={"form-control " + signupStyle.input} placeholder="Enter Last Name"
                                       value={lastName}
                                       onChange={e => setLastName(e.target.value)}/>
                            </div>
                            <div className={"form-group"}>
                                <input type={inputType ? "text" : "password"}
                                       className={"form-control " + signupStyle.input} placeholder="Enter Password"
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <div className={"form-group"}>
                                <input type={inputType ? "text" : "password"}
                                       className={"form-control " + signupStyle.input}
                                       placeholder="Enter Confirm-Password"
                                       value={repeatPassword}
                                       onChange={e => setRepeatPassword(e.target.value)}/>
                            </div>
                            <div className={"form-group mb-4"}>
                                <i className={`fa ${inputType ? "fa-eye-slash" : "fa-eye"}`}
                                   onClick={onHandleSeePassword}></i> &nbsp;
                                <label>Show Password</label>
                            </div>
                            <div className="form-group">
                                <button className={signupStyle.submitBtn}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={"col-md-2"}></div>
            </div>
        </>
    );
}
