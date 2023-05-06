import styles from "@/styles/addbutton.module.css"

const AddButton = ({buttonName, onHandleAddNew, btnWidth}) => {
    return (
        <>
            <button className={"btn " + styles.addButton} onClick={onHandleAddNew} style={{
                width: btnWidth
            }}>
                {buttonName} &nbsp;
                <i className={"fa fa-arrow-right"}></i>
            </button>
        </>
    );
}

export default AddButton;
