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
                    <div className="wrap">
                        <div className="mainTextWrapper">
                            <h1 id="networkName">MtG LC&DB</h1>
                        </div>
                    </div>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
