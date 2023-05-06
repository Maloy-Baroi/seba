import logoStyle from "@/pages/component/logo.module.css";


const LogoManagement = () => {
    return (
        <>
            <div className={logoStyle.navBrand}>
                <b>
                <span className={logoStyle.logoFirstSpan}>
                    Seba
                </span>
                    &nbsp;
                    <span className={logoStyle.logoSecondSpan}>
                    Pharmacy
                </span>
                </b>
            </div>
        </>
    );
}

export default LogoManagement;

