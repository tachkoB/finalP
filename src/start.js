import React from "react";
import ReactDOM from "react-dom";
import AnimalsContainer from "./animalsContainer";
import App from "./app.js";

ReactDOM.render(<App />, document.querySelector("main"));

export default function HelloWorld() {
    return <div>Hello, World!</div>;
}
