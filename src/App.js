import React, {useEffect, useState} from "react";
import "./App.css";
import GitHub from "./component/Github";

function App() {
  const [inputValue, setInputValue] = useState("a9");
  const [image, setImage] = useState("");
  const handleOnChange = (e) => {
    let value = e.target.value.trim();
    if (value.length > 2) {
      value = value.substr(0, 2);
    }
    setInputValue(value);
  };

  useEffect(() => {
    let textSize = "170px";
    let textOffsetX = 8;
    let textOffsetY = 195;
    if (inputValue.length === 1) {
      textSize = "200px";
      textOffsetX = 30;
    }
    let canvasTxt = document.getElementById("canvasComponent").getContext("2d");
    canvasTxt.canvas.width = 260;
    canvasTxt.canvas.height = 260;
    canvasTxt.font = `${textSize} Major Mono Display`;
    canvasTxt.fillStyle = "#990cab";
    canvasTxt.fillText(inputValue, textOffsetX, textOffsetY);
    canvasTxt.fillRect(0, 0, canvasTxt.width, canvasTxt.height);
    setImage(canvasTxt.canvas.toDataURL());
  }, [inputValue]);

  function ImageLink() {
    return image.length === 0 ? null : (
      <a href={image} download={inputValue + ".png"}>
        <img id="imageComponent" alt="icon" src={image}/>
      </a>
    );
  }

  return (
    <div className="App">
      <GitHub gitUrl={}/>
      <header className="App-header">
        <canvas id="canvasComponent" className="icon calendar"/>
        <ImageLink/>
        <p className="tip">Enter Characters + click icon to download</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleOnChange}
          size="25"
          placeholder="enter max. 2 characters"
        />
      </header>
    </div>
  );
}

export default App;
