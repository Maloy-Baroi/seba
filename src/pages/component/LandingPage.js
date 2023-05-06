import Image from 'next/image';
import Link from 'next/link';
import homeStyle from './landing.module.css';
import image1 from '../../assets/image/landing_page_image/1_new.png';
import image2 from '../../assets/image/landing_page_image/2_new.png';
import image3 from '../../assets/image/landing_page_image/3_new.png';
import image4 from '../../assets/image/landing_page_image/4_new.png';
import LogoManagement from "@/pages/component/LogoManagement";

export default function LandingPage() {
    return (
        <>
            <div style={{
                backgroundColor: "#ffffff"
            }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className={"container-fluid " + homeStyle.navContainer}>
                        <Link className={"navbar-brand"} href={"/"}>
                            <LogoManagement />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className={"navbar-nav ms-auto mb-2 mb-lg-0 " + homeStyle.navUl}>
                                <li className="nav-item">
                                    <Link className="nav-link mt-2" href={"/"}>
                                        <span>New Features</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href={"/login/"}>
                                        <button className={"btn " + homeStyle.getStartedBtn}>Get Started</button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className={homeStyle.container}>
                    <div className={"row"}>
                        <div className={"col-md-4"}>
                            <div className={homeStyle.leftHandSide}>
                                <h1>
                                    Inventory Management
                                </h1>
                                <p>
                                    Seba pharmacy inventory management system is software that helps pharmacies keep
                                    track of their inventory levels, automate reordering, and generate detailed reports
                                    for better organization and efficiency.
                                </p>
                                <button className={"btn " + homeStyle.learnMoreBtn} data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                    Learn To Use
                                </button>
                                <div className="modal fade" id="exampleModal" tabIndex="-1"
                                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header text-center">
                                                <h5 className="modal-title" id="exampleModalLabel">How to use</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <video controls={true} style={{
                                                    width: "100%"
                                                }}>
                                                    <source src="/howtodoit.mp4" type="video/mp4"/>
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                            <div className="modal-footer">
                                                <small>This website is a <b>
                                                    <Link href={"https://semsoftltd.com/"} target={"_blank"}>
                                                        `SEMSOFT Limited`
                                                    </Link>
                                                </b> product.</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-8 " + homeStyle.rightHandSide}>
                            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <Image src={image1} className="d-block w-100" alt="..."/>
                                    </div>
                                    <div className="carousel-item">
                                        <Image src={image2} className="d-block w-100" alt="..."/>
                                    </div>
                                    <div className="carousel-item">
                                        <Image src={image3} className="d-block w-100" alt="..."/>
                                    </div>
                                    <div className="carousel-item">
                                        <Image src={image4} className="d-block w-100" alt="..."/>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button"
                                        data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button"
                                        data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}