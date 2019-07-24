import React from "react";
import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";

export default class Welcome extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <HashRouter>
                <div className="mainContainer">
                    <h1 id="networkName">Wazaaaaap</h1>
                    <img className="zucky" src={"./zucky.png"} />
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
