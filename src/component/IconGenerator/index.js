import React, {useState} from "react";
import "native-toast/dist/native-toast.css";
import './IconGenerator.scss';
import {errorToast} from "../../utils/toastHelper";
import CanavasPreview from "../CanavasPreview";
import FaviconRedirectButton from "../FaviconRedirectButton";
import Button from "@material-ui/core/Button";

const IconGenerator = () => {
    const [inputValue, setInputValue] = useState("⏰");

    const handleOnChange = e => {
        let value = e.target.value.trim();
        if (value.length > 2) {
            errorToast("Max. 2x Characters allowed!");
            value = value.substr(0, 2);
        }
        setInputValue(value);
    };

    return (
        <div className="container">
            <div className="item preview">
                <CanavasPreview inputValue={inputValue}/>
            </div>
            <div className="item">
                <div className="step">
                    <div className="step-number">1</div>
                    <span className="label">Enter letters:</span>
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleOnChange}
                        size="25"
                        placeholder="Max. 2 characters"
                    />
                </div>
            </div>
            <div className="item">
                <div className="step">
                    <div className="step-number">2</div>
                    <span className="label">Click preview to download:</span>
                </div>
                <Button>Download</Button>
            </div>
            <div className="item">
                <div className="step">
                    <div className="step-number">3</div>
                    <span className="label">Upload the image:</span>
                </div>
                <FaviconRedirectButton/>
            </div>
        </div>
    );
};

export default IconGenerator;
