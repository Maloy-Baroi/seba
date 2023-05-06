import Link from "next/link";
import navStyle from "./navbar.module.css";

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className={"container"}>
                    <Link className="navbar-brand" href={"#"}>
                        Seba Pharmacy
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className={"nav-item " + navStyle.navItem}>
                                <Link className="nav-link" href={"#"}>New Features</Link>
                            </li>
                            <li className={"nav-item " + navStyle.navItem}>
                                <Link className="nav-link" href={"/login/"}>Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;