import React from "react";
import "./App.css";
import GitHub from "./component/Github";
import IconGenerator from "./component/IconGenerator";

function App() {
    return (
        <div className="App">
            <GitHub gitUrl={'https://github.com/vikbert/appikcon.git'}/>
            <IconGenerator/>
        </div>
    );
}

export default App;
