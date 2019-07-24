import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Registration from "./registration";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <img src={"./doggy.jpg"} />;
}

ReactDOM.render(elem, document.querySelector("main"));
