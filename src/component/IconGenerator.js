import React, {useState} from "react";
import "native-toast/dist/native-toast.css";
import {errorToast} from "../utils/toastHelper";
import CanavasPreview from "./CanavasPreview";

const IconGenerator = () => {
    const [inputValue, setInputValue] = useState("🍖");

    const handleOnChange = e => {
        let value = e.target.value.trim();
        if (value.length > 2) {
            errorToast("Max. 2x Characters allowed!");
            value = value.substr(0, 2);
        }
        setInputValue(value);
    };

    return (
        <>
            <CanavasPreview inputValue={inputValue}/>
            Enter Letters:
            <input
                type="text"
                value={inputValue}
                onChange={handleOnChange}
                size="25"
                placeholder="enter max. 2 characters"
            />
        </>
    );
};

export default IconGenerator;
