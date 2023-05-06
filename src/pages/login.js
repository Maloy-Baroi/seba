import Head from "next/head";
import {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import loginStyle from "../styles/login.module.css";

const login = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [email, setEmail] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [password, setPassword] = useState("");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigator = useRouter();

    const isValidEmail = () => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        let emailIcon = document.getElementById("emailID");
        if (regex.test(email)) {
            emailIcon.classList.remove("fa-envelope-open");
            emailIcon.classList.add("fa-envelope");
        } else {
            emailIcon.classList.add("fa-envelope-open");
            emailIcon.classList.remove("fa-envelope");
        }
    }

    const showPassword = (e) => {
        e.preventDefault();
        let passwd = document.getElementById('password');
        let showIcon = document.getElementById('showIcon');
        if (passwd.type === "password") {
            passwd.type = 'text';
            showIcon.classList.add("fa-eye-slash");
            showIcon.classList.remove("fa-eye");
        } else {
            passwd.type = "password";
            showIcon.classList.add("fa-eye");
            showIcon.classList.remove("fa-eye-slash");
        }
    }

    const onHandleLoginSubmit = (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://seba-backend.xyz/api-auth/login/",
            requestOptions
        )
            .then(response => response.json())
            .then(result => {
                if ((result['access'] != null)) {
                    if (result['group'] === 'seller') {
                        localStorage.setItem("access_token", result['access'])
                        localStorage.setItem("group", result['group'])
                        localStorage.setItem("auth", true)
                        navigator.push('seller/dashboard');
                    } else if (result['group'] === 'manager') {
                        localStorage.setItem("access_token", result['access'])
                        localStorage.setItem("group", result['group'])
                        localStorage.setItem("auth", true)
                        navigator.push('manager/dashboard')
                    }
                }
            })
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <Head>
                <title>
                    Seba Pharmacy | IMS | Login
                </title>
            </Head>
            <main>
                <div className={loginStyle.container}>
                    <div className={"row"}>
                        <div className={"col-md-5 " + loginStyle.loginContainer}>
                            <div className={"m-2"}>
                                <div className={loginStyle.logoNormal}>

                                    <h3>Inventory Management System</h3>
                                </div>
                                <div className={loginStyle.loginUserheading}>
                                    <h3>Sign In</h3>
                                    <h4>Please Login to your account</h4>
                                </div>
                                <form className={"form-group " + loginStyle.formLogin} onSubmit={onHandleLoginSubmit}>
                                    <div className={loginStyle.formInputContainer}>
                                        <label>Email</label>
                                        <input onBlur={isValidEmail} type={"email"} value={email} onChange={e => setEmail(e.target.value)}
                                               placeholder={"Enter your email address"} required={true} />
                                        <i id={"emailID"} className={"fa fa-envelope-open"}></i>
                                    </div>

                                    <div className={loginStyle.formInputContainer}>
                                        <label>Password</label>
                                        <input type={"password"} value={password}
                                               onChange={e => setPassword(e.target.value)}
                                               placeholder={"Enter your password"} id={"password"} required={true} />
                                        <i className={"fa fa-eye"} onClick={showPassword} id={"showIcon"}></i>
                                    </div>

                                    <div className={loginStyle.formInputContainer}>
                                        <h4 className={loginStyle.forgetPasswordText}>
                                            <Link href={'/password-recovery/'}>
                                                Forget Password?
                                            </Link>
                                        </h4>
                                    </div>

                                    <div className={loginStyle.formInputContainer}>
                                        <button type={"submit"} className={"btn " + loginStyle.signInButton}>
                                            Sign In
                                        </button>
                                    </div>

                                    <div className={loginStyle.formInputContainer}>
                                        <div className={loginStyle.homeButtonContainer}>
                                            <button className={"btn " + loginStyle.homeButton}
                                                    onClick={() => navigator.push('')}>
                                                Back to Home
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={"col-md-7 " + loginStyle.rhsSytle}>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default login;
