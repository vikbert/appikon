import React from "react";
import "./App.css";
import GitHub from "./component/Github";
import IconGenerator from "./component/IconGenerator";

function App() {
  return (
    <div className="App">
      <GitHub gitUrl={'https://github.com/vikbert/appikcon.git'}/>
      <header className="App-header">
        <IconGenerator/>
      </header>
    </div>
  );
}

export default App;
