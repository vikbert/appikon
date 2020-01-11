import React from "react";
import "./App.css";
import GitHub from "./component/Github";
import IconGenerator from "./component/IconGenerator";

function App() {
    return (
        <div className="App">
            <GitHub gitUrl={'https://github.com/vikbert/appikcon.git'}/>
            <IconGenerator/>
            <div className="headerTitle">
                <h1>a minimal icon generator</h1>
            </div>
        </div>
    );
}

export default App;
