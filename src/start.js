import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
// import Registration from "./registration";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
