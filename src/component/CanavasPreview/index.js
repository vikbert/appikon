import React, {useEffect, useState} from "react";
import CanvasConfig from "./CanvasConfig";
import {successToast} from "../../utils/toastHelper";
import isEmoji from "../../utils/isEmoji";

const CanavasPreview = ({inputValue}) => {
    const [image, setImage] = useState("");

    const handleClickForDownload = e => {
        if (inputValue.length === 0) {
            e.preventDefault();

            return;
        }

        successToast(
            "Icon downloaded! Now click on the button to go to favicon generator for uploading your icon!",
        );
    };

    const DownloadLink = () => {
        return (
            <a href={image}
               download={"logo.png"}
               onClick={handleClickForDownload}
            >
                <img
                    className={"appIcon"}
                    id="imageComponent"
                    alt="icon"
                    src={image}
                />
            </a>
        );
    };

    useEffect(() => {
        let inputType = inputValue.length === 1 ? "single" : "double";
        if (isEmoji(inputValue)) {
            inputType = "emoji";
        }

        const canvasTxt = document
            .getElementById("canvasComponent")
            .getContext("2d");

        canvasTxt.canvas.width = CanvasConfig.width;
        canvasTxt.canvas.height = CanvasConfig.height;
        canvasTxt.font = CanvasConfig.textFont[inputType];
        canvasTxt.fillStyle = CanvasConfig.textColor;
        canvasTxt.fillText(
            inputValue,
            CanvasConfig.offsetX[inputType],
            CanvasConfig.offsetY[inputType],
        );
        canvasTxt.fillRect(0, 0, canvasTxt.width, canvasTxt.height);
        setImage(canvasTxt.canvas.toDataURL());
    }, [inputValue]);

    return (
        <div className={'preview-container'}>
            <canvas id="canvasComponent" className="icon calendar"/>
            {image !== '' && (<DownloadLink/>)}
        </div>
    );
};

export default CanavasPreview;
