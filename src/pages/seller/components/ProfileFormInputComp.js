import React, { useState } from "react";
import inputStyle from "@/styles/profileFormInputComp.module.css";
import uploadIcon from "@/assets/image/upload_file.svg";
import Image from "next/image";

const ProfileFormInputComp = ({
                                  inputValue,
                                  labelText,
                                  inputType,
                                  placeholderText,
                                  requiredPositive,
                                  disablePositive,
                                  onInputChange,
                              }) => {
    const [previewImage, setPreviewImage] = useState(null); // State to store the preview image URL

    const handleChange = (event) => {
        if (inputType === "text") {
            onInputChange(event.target.value);
        } else if (inputType === "file") {
            const file = event.target.files[0];
            if (file) {
                const imageURL = URL.createObjectURL(file);
                setPreviewImage(imageURL); // Set the preview image URL
            } else {
                setPreviewImage(null); // Clear the preview image
            }
            onInputChange(file);
        }
    };

    return (
        <div className="form-group">
            <label className={inputStyle.label}>
                {labelText} &nbsp;
                <span className={requiredPositive ? inputStyle.mandatory : inputStyle.notMandatory}>*</span>
            </label>
            {inputType === "text" && (
                <input
                    className={inputStyle.input}
                    type={inputType}
                    placeholder={placeholderText}
                    disabled={disablePositive}
                    value={inputValue}
                    onChange={handleChange}
                />
            )}
            {inputType === "file" && (
                <div className={inputStyle.imageUpload}>
                    <input
                        className={inputStyle.fileInput}
                        type={inputType}
                        placeholder={placeholderText}
                        disabled={disablePositive}
                        onChange={handleChange}
                    />
                    <div className={inputStyle.imageUploads}>
                        {previewImage ? (
                            <Image className={inputStyle.previewImage} src={previewImage} alt="Preview" style={{
                                width: "200px",
                                height: "100px"
                            }
                            } />
                        ) : (
                            <div>
                                <i className="fa fa-upload" aria-hidden="true"></i>
                                <h4>Click to upload</h4>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileFormInputComp;
