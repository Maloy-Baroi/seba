import logoutStyle from "./logoutButton.module.css"
import {useRouter} from "next/router";

const LogoutButton = () => {
    const navigator = useRouter();
    const onHandleLogout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("group")
        localStorage.setItem("auth", false)
        navigator.push("/login/")
    }
    return (
        <>
            <button onClick={onHandleLogout} className={logoutStyle.btn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round"
                     className="feather feather-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span></button>
        </>
    );
}

export default LogoutButton;
