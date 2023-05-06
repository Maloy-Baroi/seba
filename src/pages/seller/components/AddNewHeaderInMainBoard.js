import MainboardHead from "@/pages/seller/components/MainboardHead";
import {useEffect, useState} from "react";

const AddNewHeaderInMainBoard = ({header4Text, header6Text, addingThing, onHandleShowForm}) => {
    const [userType, setUserType] = useState("")

    useEffect(() => {
        setUserType(localStorage.getItem("group"))
    }, [])

    return (
        <>
            <div className={"row"}>
                <div className={"col-md-8"}>
                    <MainboardHead h4Text={header4Text} h6Text={header6Text}/>
                </div>
                <div className={"col-md-4 mt-4"}>
                    {userType === "manager"
                        ?
                        <div>
                            <button className={"btn btn-success"} onClick={onHandleShowForm}>Add New {addingThing}</button>
                        </div>
                        : <div></div>
                    }
                </div>
            </div>
        </>
    );
}

export default AddNewHeaderInMainBoard;
