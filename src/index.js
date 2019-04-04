import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";

class Welcome extends React.Component {
    render () {
        return <h1>Hello World from React boilerplate</h1>;
    }
}

ReactDOM.render(<Welcome />, document.getElementById("app"));