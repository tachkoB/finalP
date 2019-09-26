import React from "react";
import Registration from "./registration";
import { HashRouter, Route, Link } from "react-router-dom";
import Login from "./login";

export default class Welcome extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <HashRouter>
                <div className="mainContainer">
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        );
    }
}
