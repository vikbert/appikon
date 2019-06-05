import React, {useEffect, useState} from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("de");
  const [image, setImage] = useState("");
  const handleOnChange = (e) => {
    let value = e.target.value.trim();
    if (value.length > 2) {
      value = value.substr(0, 2);
    }
    setInputValue(value);
  };

  useEffect(() => {
    let canvasTxt = document.getElementById("canvasComponent").getContext("2d");
    canvasTxt.canvas.width = 260;
    canvasTxt.canvas.height = 260;
    canvasTxt.font = "160px Major Mono Display";
    canvasTxt.fillStyle = "#990cab";
    canvasTxt.fillText(inputValue, 8, 180);
    canvasTxt.fillRect(0, 0, canvasTxt.width, canvasTxt.height);
    setImage(canvasTxt.canvas.toDataURL());
  });

  return (
    <div className="App">
      <header className="App-header">
        <canvas id="canvasComponent" className="icon calendar"/>
        {image.length > 0 ? (
          <img id="imageComponent" alt="icon image" src={image}/>
        ) : null}

        <p>Enter 2 Characters to generate your iOS icon</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleOnChange}
          placeholder="max. 2 characters"
        />
      </header>
    </div>
  );
}

export default App;
